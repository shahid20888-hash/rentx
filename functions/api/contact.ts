export const onRequestPost = async (context: {
  request: Request;
  env: {
    RESEND_API_KEY?: string;
    CONTACT_TO_EMAIL?: string;
  };
}): Promise<Response> => {
  const { request, env } = context;

  const responseHeaders = new Headers({
    "Content-Type": "application/json",
  });

  // Log 1: Endpoint hit and method
  console.log(`[Pages Function] Endpoint hit: /api/contact, Method: ${request.method}`);

  // 1. Accept POST only
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed. Only POST is supported." }),
      { status: 405, headers: responseHeaders }
    );
  }

  try {
    // 2. Read JSON body: name, email, message
    let body: any;
    try {
      body = await request.json();
    } catch (err) {
      console.error("[Pages Function] Error parsing JSON body:", err);
      return new Response(
        JSON.stringify({ success: false, error: "Invalid JSON body." }),
        { status: 400, headers: responseHeaders }
      );
    }

    const { name, email, subject, message } = body;

    // 3. Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return new Response(
        JSON.stringify({ success: false, error: "Name is required." }),
        { status: 400, headers: responseHeaders }
      );
    }
    if (name.length > 100) {
      return new Response(
        JSON.stringify({ success: false, error: "Name must be 100 characters or less." }),
        { status: 400, headers: responseHeaders }
      );
    }

    if (!email || typeof email !== "string" || email.trim() === "") {
      return new Response(
        JSON.stringify({ success: false, error: "Email is required." }),
        { status: 400, headers: responseHeaders }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return new Response(
        JSON.stringify({ success: false, error: "Please provide a valid email address." }),
        { status: 400, headers: responseHeaders }
      );
    }

    if (!subject || typeof subject !== "string" || subject.trim() === "") {
      return new Response(
        JSON.stringify({ success: false, error: "Subject is required." }),
        { status: 400, headers: responseHeaders }
      );
    }
    if (subject.length > 200) {
      return new Response(
        JSON.stringify({ success: false, error: "Subject must be 200 characters or less." }),
        { status: 400, headers: responseHeaders }
      );
    }

    if (!message || typeof message !== "string" || message.trim() === "") {
      return new Response(
        JSON.stringify({ success: false, error: "Message is required." }),
        { status: 400, headers: responseHeaders }
      );
    }
    if (message.length > 3000) {
      return new Response(
        JSON.stringify({ success: false, error: "Message must be 3000 characters or less." }),
        { status: 400, headers: responseHeaders }
      );
    }

    // 4. Use env variables (Read safely)
    const resendApiKey = env.RESEND_API_KEY?.trim();
    const contactToEmail = env.CONTACT_TO_EMAIL?.trim();

    // Log 2: Env variables check (True/False only)
    console.log(`[Pages Function] Env check -> RESEND_API_KEY exists: ${!!resendApiKey}, CONTACT_TO_EMAIL exists: ${!!contactToEmail}`);

    if (!resendApiKey) {
      console.error("[Pages Function] Missing RESEND_API_KEY environment variable.");
      return new Response(
        JSON.stringify({ success: false, error: "Email sending configuration (API Key) is missing on the server." }),
        { status: 500, headers: responseHeaders }
      );
    }

    if (!contactToEmail) {
      console.error("[Pages Function] Missing CONTACT_TO_EMAIL environment variable.");
      return new Response(
        JSON.stringify({ success: false, error: "Destination email configuration is missing on the server." }),
        { status: 500, headers: responseHeaders }
      );
    }

    // 5. Construct email contents (Name, Email, Message, Page URL, Date)
    const date = new Date().toISOString();
    const pageUrl = request.headers.get("referer") || "Unknown Page";

    const textContent = `
New RentX Contact Form Submission

Date: ${date}
Page URL: ${pageUrl}

----------------------------------------
Name: ${name.trim()}
Email: ${email.trim()}
Subject: ${subject.trim()}
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
        <td class="label">Date:</td>
        <td>${date}</td>
      </tr>
      <tr>
        <td class="label">Page URL:</td>
        <td><a href="${pageUrl}">${pageUrl}</a></td>
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
        <td>${subject.trim()}</td>
      </tr>
    </table>
    
    <p><strong>Message:</strong></p>
    <div class="message-box">${message.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
    
    <div class="footer">
      This email was automatically generated by the RentX Contact Form Handler.
    </div>
  </div>
</body>
</html>
    `.trim();

    // 6. Send via Resend REST API
    console.log("[Pages Function] Calling Resend API to send email...");
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
        subject: `RentX: ${subject.trim()}`,
        text: textContent,
        html: htmlContent,
      }),
    });

    // Log 3: Resend status code
    console.log(`[Pages Function] Resend status code: ${resendResponse.status}`);

    // 7. If Resend API fails, return exact safe error message
    if (!resendResponse.ok) {
      let errorMessage = `Resend API Error: ${resendResponse.statusText}`;
      try {
        const resendJson = await resendResponse.json() as any;
        if (resendJson && resendJson.message) {
          errorMessage = resendJson.message;
        } else if (resendJson && typeof resendJson === "object") {
          errorMessage = JSON.stringify(resendJson);
        }
      } catch {
        const resendText = await resendResponse.text().catch(() => "");
        if (resendText) {
          errorMessage = resendText;
        }
      }
      
      // Log 4: Resend error response
      console.log(`[Pages Function] Resend error response: ${errorMessage}`);
      
      return new Response(
        JSON.stringify({ success: false, error: errorMessage }),
        { status: resendResponse.status, headers: responseHeaders }
      );
    }

    console.log("[Pages Function] Email sent successfully.");
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: responseHeaders }
    );
  } catch (error: any) {
    console.error("[Pages Function] Unexpected error in POST handler:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message || "An unexpected server error occurred." }),
      { status: 500, headers: responseHeaders }
    );
  }
};
