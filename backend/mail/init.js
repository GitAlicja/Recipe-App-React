const nodemailer = require('nodemailer');

const getTransport = () => nodemailer.createTransport({
    port: 587, // true for 465, false for other ports
    secure: false,
    requireTLS: true,
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});

module.exports = getTransport;
