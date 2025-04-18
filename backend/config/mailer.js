const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "palgunjan973@gmail.com",
    pass: "iibt xfvi ufna isxr",
  },
});
const sendEmail = async (email, token) => {
  const mailOptions = {
    from: "gunjanpal@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Click the following link to verify your email: http://localhost:4000/api/verify/forget-password/${token}`,
    html: `<p>Click the link below to reset your password:</p>
           <a href="http://localhost:4000/api/reset-password/${token}">Forget Password</a>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent:" + info.response);
    }
  });
};

module.exports = sendEmail;
