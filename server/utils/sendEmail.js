import nodemailer from "nodemailer";

const sendMail = async function (options) {
  // Create transporter
  let transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false,
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.USER_MAIL_PASS,
    },
  });

  // Mail options
  const mailOptions = {
    from: process.env.MAILTRAP_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message, // use text instead of "message"
  };

  // Send mail
  await transporter.sendMail(mailOptions);
};

export default sendMail;
