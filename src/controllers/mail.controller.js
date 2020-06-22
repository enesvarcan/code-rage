const nodemailer = require('nodemailer')
const ErrorHandler = require('../helpers/error.handler')

var transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    secureConnection: false,
    port: 587,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        ciphers: 'SSLv3'
    }
})


exports.welcome = (req, res, next) => {

    var msg = {
        to: req.user.email,
        from: 'Code Rage',
        subject: '<Code Rage> Welcome!',
        text: 'Welcome to Code Rage. Share your ideas and knowledge with developers all around the world or read the articles and learn more. Enjoy!'
    }

    transporter.sendMail(msg, (err, info) => {
        //if (err) return next(new ErrorHandler(500, 'failed_to_send_mail'))

        return res.redirect('/')
    })
}

exports.forgotPassword = (req, res, next) => {

    var url = process.env.LINK + '/forgotPassword/' + req.token

    var msg = {
        to: req.body.email,
        from: 'Code Rage',
        subject: '<Code Rage> Password Reset Request',
        text: `You have requested to reset your password. Please click the link below.
                ${url}`
        
    }

    transporter.sendMail(msg, (err, info) => {
        if (err) return next(new ErrorHandler(500, 'failed_to_send_mail'))

        return res.send({message: 'reset_password_mail_sent', info: info.response})
    })

}

exports.changePassword = (req, res, next) => {

    var msg = {
        to: req.user.email,
        from: 'Code Rage',
        subject: '<Code Rage> Your Password is Changed',
        text: `Your Code Rage account password has been changed at: ${new Date()}`
    }

    transporter.sendMail(msg, (err, info) => {
        if (err) return next(new ErrorHandler(500, 'failed_to_send_mail'))

        return res.send({message: 'change_password_mail_sent', info: info.response})
    })

}