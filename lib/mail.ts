// a transporter for SMTP
import { createTransport } from 'nodemailer';

// using ethereal (see .env)
const transport = createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    ignoreTLS: process.env.NODE_ENV !== 'production',
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
    await transport.sendMail({
        to,
        from: process.env.MAIL_FROM,
        subject: 'RetroList - Your Password Reset Link',
        html: makeNiceEmail(`To reset your password
            <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">
                click here!
            </a>
        `),
    });
};

export const sendEmailVerificationEmail = async (
    verificationToken: string,
    to: string
): Promise<void> => {
    // email the verification token
    await transport.sendMail({
        to,
        from: process.env.MAIL_FROM,
        subject: 'RetroList - Your Email Verification Link',
        html: makeNiceEmail(`To verify your account
            <a href="${process.env.FRONTEND_URL}/verify?token=${verificationToken}">
                click here!
            </a>
        `),
    });
};

export const sendWelcomeEmail = async (to: string): Promise<void> => {
    await transport.sendMail({
        to,
        from: process.env.MAIL_FROM,
        subject: 'RetroList - Welcome',
        html: makeNiceEmail(`Your account has been verified, to login
            <a href="${process.env.FRONTEND_URL}/login">
                click here!
            </a>
        `),
    });
};
