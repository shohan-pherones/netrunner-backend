import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Options, SentMessageInfo } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter<SentMessageInfo, Options>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendOtpEmail(email: string, otp: string): Promise<void> {
    const mailOptions = {
      from: `"Netrunner" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}. It will expire in 5 minutes.`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendPasswordResetEmail(
    email: string,
    resetLink: string,
  ): Promise<void> {
    const mailOptions = {
      from: `"Netrunner" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      text: `You requested to reset your password. Please click on the following link to reset your password: ${resetLink}. This link will expire in 15 minutes.`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
