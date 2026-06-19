import client from "../config/brevo.js"

class MailService {
    async deliverMail(toEmail, subject, text, html)
    {
        await client.transactionalEmails.sendTransacEmail({
            sender: {
                name: "Pasta",
                email: "soumikmajumder02@gmail.com"
            },

            to: [{ email: toEmail }],

            subject,

            textContent: text,

            htmlContent: html
        })
    }

    async sendOtpMail(toEmail, otp)
    {
        try {
            await this.deliverMail(
                toEmail,

                "Your Pasta verification code",

                `Your verification code is ${otp}. It is valid for 5 minutes.`,

                `
                <h2>Pasta Verification</h2>
                <p>Your verification code is:</p>
                <h1>${otp}</h1>
                <p>This code is valid for 5 minutes.</p>
                `
            )

            return true;
        }
        catch(err) {
            console.error("MailService.sendOtpMail:", err.message);
            return false;
        }
    }
}

export default new MailService()