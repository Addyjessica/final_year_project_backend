const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendVerificationEmail = (email, token) => {
    const url = `http://localhost:5000/api/auth/verify/${token}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        text: `Please verify your email by clicking the following link: ${url}`,
        html: `<p>Please verify your email by clicking the following link: <a href="${url}">${url}</a></p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error(err);
        else console.log('Verification email sent: ' + info.response);
    });
};

module.exports = { sendVerificationEmail };
