import nodemailer from 'nodemailer';
import createHttpError from 'http-errors';

const SMTP_PORT = Number(process.env.SMTP_PORT);

export const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: options.from || process.env.SMTP_FROM,
      ...options,
    };

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Nodemailer error:', error);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};