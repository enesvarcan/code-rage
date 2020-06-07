const dbService = require('../services/database.service')

exports.createProfile = (req, res, next) => {
    
    var profileInfo = {
        userId: req.user._id,
        email: req.user.email,
        name: req.body.name,
        profilePicture: req.body.profilePicture, //TODO: upload profile picture
        interestedIn: req.body.interestedIn,
        bio: req.body.bio
    }

    dbService.insertProfile(profileInfo, (err, profile) => {
        if(err) next(err)

        if(profile){
            
            dbService.updateUser(req.user, {hasProfile: true}, (err, u) => {
                if(err) next(err)
                return res.send({message: 'profile_created', profile: profile})
            })    
        }
    })
}

exports.updateProfile = (req, res, next) => {

    dbService.findProfile(req.user._id, (err, profile) => {
        if (err) next(err)

        if(profile){
            dbService.updateProfile(profile._id, (err, updatedProfile) => {
                if(err) next(err)
                return res.send({message: 'profile_updated', updatedProfile: updatedProfile})
            })
        }
    })
    
}

exports.readProfile = (req, res, next) => {

    dbService.findProfile(req.user._id, (err, profile) => {
        if(err) next(err)

        req.user.profile = profile
        next()
    })

}