import nodemailer from 'nodemailer';
import * as dotenv from "dotenv";

dotenv.config();



export async function sendMail(email , passwordHash , name): Promise<void> {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: `"CareLink" <${process.env.SMTP_USER}>`,
        to: email,
        html: `
    <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <title>Welcome to APP_NAME!</title>
            <style>
                body {
                    background: #f4f6f8;
                    font-family: "Segoe UI", Arial, sans-serif;
                    color: #222e34;
                    padding: 0;
                    margin: 0;
                }
                .container {
                    max-width: 480px;
                    margin: 30px auto;
                    background: #fff;
                    border-radius: 12px;
                    box-shadow: 0 4px 24px rgba(22, 78, 99, 0.07);
                    overflow: hidden;
                }
                .header {
                    background: #009688;
                    color: #fff;
                    font-size: 24px;
                    font-weight: 700;
                    text-align: center;
                    padding: 28px 10px 16px 10px;
                    border-top-left-radius: 12px;
                    border-top-right-radius: 12px;
                    letter-spacing: 1px;
                }
                .logo {
                    text-align: center;
                    margin: 10px 0 0 0;
                }
                .logo img {
                    height: 48px;
                    margin-bottom: 6px;
                }
                .content {
                    font-size: 16px;
                    line-height: 1.7;
                    margin: 0 0 24px 0;
                    padding: 0 28px;
                    color: #222e34;
                }
                .credentials {
                    background: #e0f7fa;
                    padding: 16px 20px;
                    border-radius: 7px;
                    margin: 0 28px 24px 28px;
                    font-size: 15px;
                    color: #164e63;
                    border: 1px solid #b2dfdb;
                }
                .cta-area {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .cta-btn {
                    display: inline-block;
                    background: #164e63;
                    color: #fff !important;
                    text-decoration: none;
                    padding: 13px 36px;
                    border-radius: 6px;
                    font-weight: bold;
                    font-size: 16px;
                    margin: 0 auto;
                    letter-spacing: 0.5px;
                    box-shadow: 0 2px 8px rgba(22, 78, 99, 0.08);
                    transition: background 0.2s;
                }
                .cta-btn:hover {
                    background: #009688;
                }
                .important {
                    color: #00675b;
                    font-size: 14px;
                    margin-top: 24px;
                    padding: 0 28px;
                }
                .footer {
                    background: #00675b;
                    color: #e0f2f1;
                    font-size: 13px;
                    padding: 18px 18px;
                    border-bottom-left-radius: 12px;
                    border-bottom-right-radius: 12px;
                    text-align: center;
                    margin-top: 30px;
                    letter-spacing: 0.5px;
                }
                @media (max-width: 540px) {
                    .container {
                    padding: 0;
                    }
                    .content,
                    .credentials,
                    .important {
                    padding-left: 10px;
                    padding-right: 10px;
                    }
                    .cta-btn {
                    padding: 13px 16px;
                    }
                    .footer {
                    padding: 14px 4px;
                    }
                }
                </style>
            </head>
            <body>
                <div class="container">
                <div class="header">Welcome to Todo_Buddy!</div>
                <div class="logo">
                    <!-- Optional: Place your logo here -->
                    <!-- <img src="LOGO_URL" alt="APP_NAME Logo" /> -->
                </div>
                <div class="content" style="margin-bottom: 18px">
                    Hi ${name},
                    <br /><br />
                    You have been invited to join <b>ToDO Buddy</b> by INVITED_BY ${"Admin"}<br />
                    Please use the login credentials below to access your account.
                </div>
                <div class="credentials">
                    <p><b>Email:</b>${email}</p>
                    <p><b>Password:</b>${passwordHash}</p>
                </div>
                <div class="content" style="margin-bottom: 12px">
                    Click the button below to login:
                </div>
                <div class="cta-area">
                    <a href="APP_URL" class="cta-btn" target="_blank">Login to Todo_Buddy</a>
                </div>
                <div class="important">
                    <b>Important:</b> For your security, please change your password after
                    logging in for the first time.
                </div>
                <div class="footer">
                    If you did not expect this invitation, you can safely ignore this
                    email.<br />
                    &copy; YEAR APP_NAME
                </div>
                </div>
            </body>
            </html>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(` Email sent to ${email}`);
    } catch (error) {
        console.error(` Failed to send email to ${email}:`, error);
        throw error;
    }
}



