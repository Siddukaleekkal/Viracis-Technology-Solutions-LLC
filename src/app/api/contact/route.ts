import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";

const DESTINATION_EMAIL = "siddu@viracis.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName = "",
      lastName = "",
      name = "",
      email,
      phone = "",
      company = "",
      jobTitle = "",
      industry = "",
      source = "Website Form",
      message = "",
    } = body;

    const fullName = (name || `${firstName} ${lastName}`).trim() || "Website Visitor";

    console.log(`[FORM SUBMISSION -> ${DESTINATION_EMAIL}]`, {
      fullName,
      email,
      phone,
      company,
      jobTitle,
      industry,
      source,
      timestamp: new Date().toISOString(),
    });

    // Basic validation
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    let emailDelivered = false;
    const errors: string[] = [];

    // 1. Send via Resend to siddu@viracis.com
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        // Fallback sender if custom domain is not yet verified in Resend
        const fromEmail = process.env.RESEND_FROM_EMAIL || "Viracis Lead Notifications <onboarding@resend.dev>";

        const { data: resendData, error: resendError } = await resend.emails.send({
          from: fromEmail,
          to: [DESTINATION_EMAIL],
          replyTo: email,
          subject: `New Demo Request: ${fullName} (${company || "No Company"}) via ${source}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0A2540; padding: 24px; border: 1px solid #E2E8F0; border-radius: 12px; background: #ffffff;">
              <div style="border-bottom: 3px solid #0B1B3D; padding-bottom: 16px; margin-bottom: 20px;">
                <h2 style="color: #0B1B3D; margin: 0 0 6px 0; font-size: 22px; font-weight: 700;">New Form Submission</h2>
                <p style="color: #64748B; margin: 0; font-size: 13px;">Routed to <strong>${DESTINATION_EMAIL}</strong> via <strong>${source}</strong></p>
              </div>

              <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
                <tr style="border-bottom: 1px solid #F1F5F9;">
                  <td style="padding: 10px 0; color: #64748B; font-weight: 600; width: 140px;">Name:</td>
                  <td style="padding: 10px 0; color: #0F172A; font-weight: 700;">${fullName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #F1F5F9;">
                  <td style="padding: 10px 0; color: #64748B; font-weight: 600;">Work Email:</td>
                  <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #0284C7; text-decoration: none; font-weight: 600;">${email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #F1F5F9;">
                  <td style="padding: 10px 0; color: #64748B; font-weight: 600;">Phone:</td>
                  <td style="padding: 10px 0; color: #0F172A; font-weight: 600;">${phone || "Not provided"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #F1F5F9;">
                  <td style="padding: 10px 0; color: #64748B; font-weight: 600;">Company:</td>
                  <td style="padding: 10px 0; color: #0F172A; font-weight: 600;">${company || "Not provided"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #F1F5F9;">
                  <td style="padding: 10px 0; color: #64748B; font-weight: 600;">Job Title:</td>
                  <td style="padding: 10px 0; color: #0F172A;">${jobTitle || "Not provided"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #F1F5F9;">
                  <td style="padding: 10px 0; color: #64748B; font-weight: 600;">Industry:</td>
                  <td style="padding: 10px 0; color: #0F172A;">${industry || "Not provided"}</td>
                </tr>
                ${message ? `
                <tr style="border-bottom: 1px solid #F1F5F9;">
                  <td style="padding: 10px 0; color: #64748B; font-weight: 600;">Notes:</td>
                  <td style="padding: 10px 0; color: #0F172A;">${message}</td>
                </tr>` : ""}
                <tr>
                  <td style="padding: 10px 0; color: #64748B; font-weight: 600;">Received:</td>
                  <td style="padding: 10px 0; color: #64748B;">${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} EDT</td>
                </tr>
              </table>

              <div style="text-align: center; margin-top: 24px; padding-top: 20px; border-top: 1px solid #E2E8F0;">
                <a href="mailto:${email}?subject=Viracis%20Demo%20Walkthrough" style="display: inline-block; background: #0B1B3D; color: #ffffff; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 14px;">Reply Directly to ${fullName}</a>
              </div>
            </div>
          `,
        });

        if (resendError) {
          console.error("[Resend Error]:", resendError);
          errors.push(`Resend: ${resendError.message}`);
        } else {
          emailDelivered = true;
          console.log(`[Resend Success]: Email sent to ${DESTINATION_EMAIL} (ID: ${resendData?.id})`);
        }
      } catch (err: any) {
        console.error("[Resend Exception]:", err);
        errors.push(`Resend: ${err.message}`);
      }
    }

    // 2. Web3Forms fallback if configured
    const web3Key = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!emailDelivered && web3Key) {
      try {
        const w3res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: web3Key,
            to: DESTINATION_EMAIL,
            from_name: "Viracis Lead Alert",
            subject: `New Demo Request from ${fullName} (${company}) via Viracis`,
            name: fullName,
            email,
            phone,
            company,
            job_title: jobTitle,
            industry,
            source,
          }),
        });
        const w3data = await w3res.json();
        if (w3res.ok && w3data.success) {
          emailDelivered = true;
          console.log(`[Web3Forms Success]: Forwarded to ${DESTINATION_EMAIL}`);
        } else {
          errors.push(`Web3Forms: ${w3data.message || "Failed"}`);
        }
      } catch (w3err: any) {
        console.error("[Web3Forms Exception]:", w3err);
        errors.push(`Web3Forms: ${w3err.message}`);
      }
    }

    // 3. Optional: Store lead in Supabase database if configured
    try {
      if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const adminSupabase = createAdminClient();
        await adminSupabase.from("leads").insert({
          business_name: company || fullName,
          owner_name: fullName,
          owner_email: email,
          owner_phone: phone,
          status: "new_inquiry",
          source: source,
        });
      }
    } catch {
      // Non-blocking for client response
    }

    return NextResponse.json({
      success: true,
      message: `Lead recorded and notification sent to ${DESTINATION_EMAIL}`,
      emailDelivered,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err: any) {
    console.error("General API Error in /api/contact:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
