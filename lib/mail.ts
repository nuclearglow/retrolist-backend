// a transporter for SMTP
import { createTransport } from 'nodemailer';

// using ethereal (see .env)
const transport = createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const makeNiceEmail = (text: string): string => `
    <div style="border=1px solid black; padding: 20px; font-family: sans-serif; line-height: 2; font-size: 20px;">
        <h2>Hello!</h2>
        <p>${text}</p>
        <p></p>
        <p>Cheers, nuky!</p>
    </div>`;

export const sendPasswordResetEmail = async (
    resetToken: string,
    to: string
): Promise<void> => {
    // email the token
    const info = await transport.sendMail({
        to,
        from: 'mailer@svenvowe.de',
        subject: 'RetroList - Your Password Reset Link',
        html: makeNiceEmail(`To reset your password
            <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">
                click here!
            </a>
        `),
    });
};
