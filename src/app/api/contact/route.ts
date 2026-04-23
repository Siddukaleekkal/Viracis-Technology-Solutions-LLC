import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, company, email, phone, service, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Viracis Website <onboarding@resend.dev>",
      to: ["hello@viracis.com"],
      replyTo: email,
      subject: `New Inquiry from ${name} via Viracis`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0A2540">
          <h2 style="color:#0A2540;margin-bottom:16px">New Contact Form Submission</h2>
          <hr style="border:none;border-top:1px solid #D6DEE3;margin:0 0 20px"/>
          <p><strong>Name:</strong> ${name}</p>
          ${company ? `<p><strong>Business:</strong> ${company}</p>` : ""}
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#0099B8">${email}</a></p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          ${service ? `<p><strong>Interested in:</strong> ${service}</p>` : ""}
          <p style="margin-top:16px"><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;color:#4A6274;margin-top:8px">${message}</p>
          <hr style="border:none;border-top:1px solid #D6DEE3;margin:24px 0"/>
          <p style="font-size:12px;color:#8FA3B3">Sent from viracis.com contact form</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
