import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// 🔍 ADD THIS RIGHT BELOW transporter creation
transporter.verify((err) => {
  if (err) {
    console.error("❌ SMTP ERROR:", err);
  } else {
    console.log("✅ SMTP READY");
  }
});

export const sendOTPEmail = async (toEmail, subject, html) => {
  return transporter.sendMail({
    from: `"OCTA forex 🐺" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject,
    html,
  });
};
