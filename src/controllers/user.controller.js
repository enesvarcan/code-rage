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