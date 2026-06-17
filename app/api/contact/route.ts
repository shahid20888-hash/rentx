import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("[Next.js API Route] Request received (POST /api/contact)");

  try {
    // 1. Parse JSON body
    let body: any;
    try {
      body = await request.json();
    } catch {
      console.log("[Next.js API Route] Error: Failed to parse JSON body");
      return NextResponse.json({ success: false, error: "Invalid JSON request body." }, { status: 400 });
    }

    const { name, email, subject, message, website, pageUrl } = body;

    console.log("[Next.js API Route] Form values received:", {
      name: name ? `${name.substring(0, 20)}...` : null,
      email,
      hasSubject: !!subject,
      messageLength: message?.length,
      hasHoneypot: !!website
    });

    // 2. Honeypot check
    if (website && typeof website === "string" && website.trim() !== "") {
      console.log("[Next.js API Route] Honeypot field filled. Dropping message silently.");
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 3. Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ success: false, error: "Name is required." }, { status: 400 });
    }
    if (name.length > 100) {
      return NextResponse.json({ success: false, error: "Name must be 100 characters or less." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || email.trim() === "") {
      return NextResponse.json({ success: false, error: "Email is required." }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ success: false, error: "Please provide a valid email address." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json({ success: false, error: "Message is required." }, { status: 400 });
    }
    if (message.length > 3000) {
      return NextResponse.json({ success: false, error: "Message must be 3000 characters or less." }, { status: 400 });
    }

    // 4. Check API configuration (Support both process.env and global scope for Edge Workers compatibility)
    const resendApiKey = process.env.RESEND_API_KEY?.trim() || (globalThis as any).RESEND_API_KEY?.trim();
    const contactToEmail = process.env.CONTACT_TO_EMAIL?.trim() || (globalThis as any).CONTACT_TO_EMAIL?.trim() || "support@rentx.us";

    console.log("[Next.js API Route] Environment variables check:", {
      RESEND_API_KEY_Exists: !!resendApiKey,
      CONTACT_TO_EMAIL_Exists: !!process.env.CONTACT_TO_EMAIL || !!(globalThis as any).CONTACT_TO_EMAIL
    });

    if (!resendApiKey) {
      console.error("[Next.js API Route] Error: RESEND_API_KEY environment variable is missing.");
      return NextResponse.json({ success: false, error: "Email sending configuration is missing on the server." }, { status: 500 });
    }

    // 5. Construct Email Contents
    const submittedAt = new Date().toISOString();
    const sourceUrl = pageUrl && typeof pageUrl === "string" ? pageUrl : request.headers.get("referer") || "Unknown Page";
    const cleanSubject = (subject && typeof subject === "string" && subject.trim() !== "") ? subject.trim().slice(0, 200) : "";
    const emailSubject = cleanSubject ? `New RentX Contact Form Submission: ${cleanSubject}` : "New RentX Contact Form Submission";

    const textContent = `
New RentX Contact Form Submission

Date/Time: ${submittedAt}
Page URL: ${sourceUrl}

----------------------------------------
Name: ${name.trim()}
Email: ${email.trim()}
Subject: ${cleanSubject || "(No subject provided)"}
Message:
${message.trim()}
----------------------------------------
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
    h2 { color: #0E2A23; border-bottom: 2px solid #C78B5E; padding-bottom: 8px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    td { padding: 8px; vertical-align: top; }
    td.label { font-weight: bold; width: 120px; color: #555; }
    .message-box { background-color: #f9f9f9; border-left: 4px solid #C78B5E; padding: 15px; white-space: pre-wrap; font-size: 14px; }
    .footer { font-size: 11px; color: #888; margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>New RentX Contact Form Submission</h2>
    <table>
      <tr>
        <td class="label">Date/Time:</td>
        <td>${submittedAt}</td>
      </tr>
      <tr>
        <td class="label">Page URL:</td>
        <td><a href="${sourceUrl}">${sourceUrl}</a></td>
      </tr>
      <tr>
        <td class="label">Name:</td>
        <td>${name.trim()}</td>
      </tr>
      <tr>
        <td class="label">Email:</td>
        <td><a href="mailto:${email.trim()}">${email.trim()}</a></td>
      </tr>
      <tr>
        <td class="label">Subject:</td>
        <td>${cleanSubject || "<em>(No subject provided)</em>"}</td>
      </tr>
    </table>
    
    <p><strong>Message:</strong></p>
    <div class="message-box">${message.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
    
    <div class="footer">
      This email was automatically generated by the RentX Contact Form Handler on Cloudflare Pages.
    </div>
  </div>
</body>
</html>
    `;

    // 6. Send via Resend API
    console.log("[Next.js API Route] Fetching Resend API to send email...");
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "RentX Contact <support@rentx.us>",
        to: [contactToEmail],
        reply_to: email.trim(),
        replyTo: email.trim(),
        subject: emailSubject,
        text: textContent,
        html: htmlContent,
      }),
    });

    console.log(`[Next.js API Route] Resend API Response Status: ${resendResponse.status}`);

    if (!resendResponse.ok) {
      const resendErrorText = await resendResponse.text();
      console.error("[Next.js API Route] Resend API Error Response:", resendErrorText);
      return NextResponse.json({ success: false, error: `Failed to send email: ${resendErrorText}` }, { status: 500 });
    }

    console.log("[Next.js API Route] Email sent successfully via Resend.");
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("[Next.js API Route] Unexpected error in POST handler:", error);
    return NextResponse.json({ success: false, error: error.message || "An unexpected server error occurred." }, { status: 500 });
  }
}
