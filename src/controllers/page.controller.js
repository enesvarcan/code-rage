const path = require('path')

exports.registerPage = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views/register.html'))
}

exports.loginPage = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views/login.html'))
}