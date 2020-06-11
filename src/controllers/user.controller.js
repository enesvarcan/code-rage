const dbService = require('../services/database.service')
const photoService = require('../services/photo.service')

exports.createProfile = (req, res, next) => {

    //TODO: Error handling for key duplication
    
    var profileInfo = {
        userId: req.user._id,
        email: req.user.email,
        name: req.body.name,
        profilePicture: photoService.uploadPhoto(req.body.profilePicture),
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

            var update = {
                name: req.body.name || profile.name,
                profilePicture: photoService.updatePhoto(req.body.profilePicture) || profile.profilePicture,
                interestedIn: req.body.interestedIn || profile.interestedIn,
                bio: req.body.bio || profile.bio
            }

            dbService.updateProfile(profile._id, update, (err, updatedProfile) => {
                if(err) next(err)
                return res.send({message: 'profile_updated', updatedProfile: updatedProfile})
            })
        } else if(!profile){
            return res.send({message: 'profile_not_found'})
        }
    })
    
}

exports.readProfile = (req, res, next) => {

    dbService.findProfile(req.user._id, (err, profile) => {
        if(err) next(err)

        if (!profile){
            return res.redirect('/user/createProfile')
        }

        req.user.profile = profile
        next()
    })

}