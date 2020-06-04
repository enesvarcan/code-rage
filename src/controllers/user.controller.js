const passport = require('passport')
const dbService = require('../services/database.service')

exports.register = (req, res, next) => {
    var userInfo = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }

    dbService.saveUser(userInfo, (err, message) => {
        if(err) next(err)
        return res.send(message)
    })
}

exports.login = (req, res, next) => {

    passport.authenticate('local', function(err, user, info){

        if(err) return next(err)
        console.log(user)

        if(!user) return res.status(402).send(info.message)

        req.logIn(user, function(err){
            if (err) return next(err)

            return res.redirect('/')
        })

    })(req, res, next)
}

exports.isLoggedIn = (req, res, next) => {
    if(req.user){
        res.redirect('/')
    } 

    else next()
}