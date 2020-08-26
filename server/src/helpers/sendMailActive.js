let nodeMailer = require("nodemailer");
let adminEmail = "milorshuynh@gmail.com";
let adminPassword = "Milos1998";
let mailHost = "smtp.gmail.com";
let mailPort = 587;

let sendMail = (to, htmlContent) => {
  let transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: adminEmail,
      pass: adminPassword,
    },
  });
  let options = {
    from: adminEmail,
    to: to,
    subject: "xác nhận đăng ký tài khoản",
    html: `
        <h2>bạn nhận được email này khi dăng ký tài khoản</h2>
        <h3>vui lòng nhấn vào link bên dưới để xác nhận mail và đợi admin mở khóa tài khoản</h3>
        <h3><a href="${htmlContent}" target="blank">${htmlContent}</a></h3>
        `,
  };
  return transporter.sendMail(options);
};
module.exports = sendMail;
