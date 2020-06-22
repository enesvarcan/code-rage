const passport = require('passport')
const dbService = require('../services/database.service')
const jwt = require('jsonwebtoken')
const ErrorHandler = require('../helpers/error.handler')

exports.register = (req, res, next) => {
    var userInfo = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }

    dbService.insertUser(userInfo, (err, user) => {
        if(err) next(err)
        
        if (user){
            req.user = user
            next()
        } 
    })
}

exports.login = (req, res, next) => {

    passport.authenticate('local', function(err, user, info){

        if(err) return next(err)

        if(!user) return next(new ErrorHandler(400, info.message))

        req.logIn(user, function(err){
            if (err) return next(err)

            return res.redirect('/')
        })

    })(req, res, next)
}

exports.logout = (req, res, next) => {
    if(req.user){
        req.logOut()
    }

    res.redirect('/')
}

exports.createToken = (req, res, next) => {

    var email = req.body.email

    dbService.findUserByEmail(email, (err, user) => {
        if (err) return next(err)

        if (!user) return next(new ErrorHandler(400, 'user_not_found'))

        jwt.sign(user.email, process.env.SECRET, (err, token) => {
            if (err) return next(err)

            if (!token) return next(new ErrorHandler(500, 'failed_to_create_token'))

            req.token = token

            next()
        })
    })

}

exports.verifyToken = (req, res, next) => {

    var token = req.params.token

    jwt.verify(token, process.env.SECRET, (err, email) => {
        if (err) return next(new ErrorHandler(500, 'failed_to_verify_token'))

        if(!email) return next(new ErrorHandler(403, 'user_not_found'))

        req.email = email

        next()
    })
}

exports.changePassword = (req, res, next) => {

    var newPassword = req.body.newPassword

    dbService.findUserByEmail(req.email, (err, user) => {
        if (err) return next(err)

        if(!user) return next(new ErrorHandler(400, 'user_not_found'))

        user.password = newPassword

        user.save((err, updatedUser) => {
            if (err) return next(err)

            return res.send({message: 'password_changed'})
        })
    })
}
