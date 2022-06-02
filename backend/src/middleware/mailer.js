const nodemailer = require("nodemailer")


async function main(email, pass) {
  if (email && pass) {
    // let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.Email, // generated ethereal user
        pass: process.env.Email_PASS, // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: `Find Black-list ${process.env.Email}`, // sender address
      to: email, // list of receivers
      subject: "Your Password for find black-list", // Subject line
      text: "Here is your logInId and Password for Admin Access ", // plain text body
      html: `<p>Email : ${email}<br>
            Password : ${pass}</p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}

main().catch(console.error);
module.exports = main