import nodemailer from 'nodemailer';
import { EMAIL_FROM, EMAIL_PASSWORD, MAIL_HOST, MAIL_PORT } from '..';
import { HttpException } from '@/exceptions/HttpException';

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: +false,
  auth: {
    user: EMAIL_FROM,
    pass: EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


export const mailOTP = async (email: string, otp: string) => {
  console.log("🚀 ~ file: index.ts:20 ~ mailOTP ~ email:", email)
  const mailOptions = {
    from: EMAIL_FROM,
    to: email,
    subject: 'Your OTP',
    text: `Your OTP is ${otp}`,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new HttpException(500, 'Send email failed', false);
    } else {
      throw new HttpException(200, 'Send OTP successfully', false);
    }
  });
};
