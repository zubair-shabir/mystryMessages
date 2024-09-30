import { mailjetClient } from "@/lib/mailjet";
import VerificationEmail from "../../emails/VerficationEmail";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
) {
  try {
    const htmlContent = VerificationEmail({ username, otp: verifyCode });

    // Send the email using Mailjet
    const request = await mailjetClient
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "zubairshabir980@gmail.com",
              Name: "Mystry Message",
            },
            To: [
              {
                Email: email,
                Name: username,
              },
            ],
            Subject: "Mystry Message | Verification Code",
            HTMLPart: htmlContent,
          },
        ],
      });

    return {
      success: true,
      message: "Verification Email sent successfully",
      body: request.body,
    };
  } catch (emailError) {
    console.error("Error sending verification Email", emailError);

    return { success: false, message: "Failed to send Verification Email" };
  }
}
