const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //  이메일 서비스 제공자 설정
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 이메일 옵션
  const mailOptions = {
    from: 'Freeefly <freeefly@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  // 이메일 전송
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
