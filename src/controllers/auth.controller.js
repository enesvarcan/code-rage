const passport = require('passport')
const dbService = require('../services/database.service')

exports.register = (req, res, next) => {
    var userInfo = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }

    dbService.insertUser(userInfo, (err, user) => {
        if(err) next(err)
        
        if (user){
            return res.status(200).send({message: 'registration_complete'})
        } 
    })
}

exports.login = (req, res, next) => {

    passport.authenticate('local', function(err, user, info){

        if(err) return next(err)

        if(!user) return res.status(402).send(info)

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
