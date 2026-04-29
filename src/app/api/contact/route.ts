import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Initialize Resend with API key
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("CRITICAL: RESEND_API_KEY is missing from environment variables.");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const body = await request.json();
    const { name, company, email, phone, service, message } = body;

    console.log("Contact form submission received:", { name, email, company });

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Send email via Resend
    // Note: If domain is not verified, this will only work sending TO the account owner
    // and FROM onboarding@resend.dev
    const { data, error } = await resend.emails.send({
      from: "Viracis Website <onboarding@resend.dev>",
      to: ["siddu@viracis.com"], // Updated to use the CEO's direct email
      replyTo: email,
      subject: `New Inquiry from ${name} via Viracis`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0A2540;padding:20px;border:1px solid #D6DEE3;border-radius:12px;">
          <h2 style="color:#0A2540;margin-bottom:16px;font-size:24px;">New Contact Form Submission</h2>
          <hr style="border:none;border-top:1px solid #D6DEE3;margin:20px 0"/>
          
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;font-weight:bold;width:120px;">Name:</td>
              <td style="padding:8px 0;">${name}</td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding:8px 0;font-weight:bold;">Business:</td>
              <td style="padding:8px 0;">${company}</td>
            </tr>` : ""}
            <tr>
              <td style="padding:8px 0;font-weight:bold;">Email:</td>
              <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#0099B8;text-decoration:none;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding:8px 0;font-weight:bold;">Phone:</td>
              <td style="padding:8px 0;">${phone}</td>
            </tr>` : ""}
            ${service ? `
            <tr>
              <td style="padding:8px 0;font-weight:bold;">Interested in:</td>
              <td style="padding:8px 0;">${service}</td>
            </tr>` : ""}
          </table>

          <div style="margin-top:24px;padding:16px;background-color:#F5F7F9;border-radius:8px;">
            <p style="margin:0 0 8px 0;font-weight:bold;color:#0A2540;">Message:</p>
            <p style="margin:0;white-space:pre-wrap;color:#4A6274;line-height:1.6;">${message}</p>
          </div>

          <hr style="border:none;border-top:1px solid #D6DEE3;margin:24px 0"/>
          <p style="font-size:12px;color:#8FA3B3;text-align:center;">Sent from viracis.com contact form</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Email sent successfully:", data?.id);
    return NextResponse.json({ success: true, id: data?.id });

  } catch (err: any) {
    console.error("General API Error in contact route:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
