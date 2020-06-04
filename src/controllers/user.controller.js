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
        
        if (user) return res.send({message: 'registration_complete'})
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


exports.createProfile = (req, res, next) => {
    
    var profileInfo = {
        userId: req.user._id,
        email: req.user.email,
        name: req.body.name,
        profilePicture: req.body.profilePicture, //TODO: upload profile picture
        interestedIn: req.body.interestedIn,
        bio: req.body.bio
    }

    dbService.insertUserProfile(profileInfo, (err, profile) => {
        if(err) next(err)

        if(profile){
            
            dbService.updateUser(req.user, {hasProfile: true}, (err, u) => {
                if(err) next(err)
                return res.send({message: 'profile_created'})
            })    
        }
    })
}