interface PagesFunctionContext {
  request: Request;
  env: {
    RESEND_API_KEY?: string;
    CONTACT_TO_EMAIL?: string;
  };
}

export async function onRequestPost(context: PagesFunctionContext): Promise<Response> {
  const { request, env } = context;

  // Set up standard headers
  const responseHeaders = new Headers({
    "Content-Type": "application/json",
  });

  try {
    // 1. Parse JSON body
    let body: any;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON request body." }),
        { status: 400, headers: responseHeaders }
      );
    }

    const { name, email, subject, message, website, pageUrl } = body;

    // 2. Honeypot check
    // If the hidden 'website' field is populated, we suspect a bot submission.
    // We return a 200 OK success message to prevent the bot from trying other tactics,
    // but we silently drop the email sending.
    if (website && typeof website === "string" && website.trim() !== "") {
      console.warn("Spam submission blocked via honeypot field.");
      return new Response(
        JSON.stringify({
          success: true,
          message: "Thank you! Your message has been sent successfully.",
        }),
        { status: 200, headers: responseHeaders }
      );
    }

    // 3. Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return new Response(
        JSON.stringify({ error: "Name is required." }),
        { status: 400, headers: responseHeaders }
      );
    }
    if (name.length > 100) {
      return new Response(
        JSON.stringify({ error: "Name must be 100 characters or less." }),
        { status: 400, headers: responseHeaders }
      );
    }

    if (!email || typeof email !== "string" || email.trim() === "") {
      return new Response(
        JSON.stringify({ error: "Email is required." }),
        { status: 400, headers: responseHeaders }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid email address." }),
        { status: 400, headers: responseHeaders }
      );
    }

    const cleanSubject = (subject && typeof subject === "string" && subject.trim() !== "") ? subject.trim().slice(0, 200) : "";

    if (!message || typeof message !== "string" || message.trim() === "") {
      return new Response(
        JSON.stringify({ error: "Message is required." }),
        { status: 400, headers: responseHeaders }
      );
    }
    if (message.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Message must be 5000 characters or less." }),
        { status: 400, headers: responseHeaders }
      );
    }

    // 4. Check API configuration
    const resendApiKey = env.RESEND_API_KEY?.trim();
    if (!resendApiKey) {
      console.error("Configuration Error: RESEND_API_KEY is not defined.");
      return new Response(
        JSON.stringify({ error: "Email sending configuration is missing on the server." }),
        { status: 500, headers: responseHeaders }
      );
    }

    const contactToEmail = env.CONTACT_TO_EMAIL?.trim() || "support@rentx.us";

    // 5. Construct Email Contents
    const submittedAt = new Date().toISOString();
    const sourceUrl = pageUrl && typeof pageUrl === "string" ? pageUrl : request.headers.get("referer") || "Unknown Page";

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
        subject: emailSubject,
        text: textContent,
        html: htmlContent,
      }),
    });

    if (!resendResponse.ok) {
      const resendErrorText = await resendResponse.text();
      console.error("Resend API Error:", resendErrorText);
      return new Response(
        JSON.stringify({ error: `Failed to send email: ${resendErrorText}` }),
        { status: 500, headers: responseHeaders }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you! Your message has been sent successfully.",
      }),
      { status: 200, headers: responseHeaders }
    );
  } catch (error: any) {
    console.error("Contact Form Function Error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred while processing your request." }),
      { status: 500, headers: responseHeaders }
    );
  }
}
