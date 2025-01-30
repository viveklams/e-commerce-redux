import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Accessing the environment variables
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const tlsRejectUnauthorized = process.env.NODE_TLS_REJECT_UNAUTHORIZED;

console.log(`TLS Reject Unauthorized: ${tlsRejectUnauthorized}`);

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "viveklamgadey@gmail.com",
    pass: "uqttweldksfhzehb",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(to, subject, text, html) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "viveklamgadey@gmail.com", // sender address
    to,
    subject,
    text,
    html,
  });
}

export default sendMail;
