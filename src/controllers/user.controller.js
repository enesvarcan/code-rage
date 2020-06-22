const path = require('path')
const dbService = require('../services/database.service')
const photoService = require('../services/photo.service')
const ErrorHandler = require('../helpers/error.handler')

exports.createProfile = (req, res, next) => {
    
    var profileInfo = {
        userId: req.user._id,
        email: req.user.email,
        name: req.body.name,
        interestedIn: req.body.interestedIn,
        bio: req.body.bio,
        profilePicture: 'default.jpg'
    }

    dbService.insertProfile(profileInfo, (err, profile) => {
        if(err) return next(err)

        if(profile){
            
            dbService.updateUser(req.user, {hasProfile: true}, (err, u) => {
                if(err) return next(err)
                return res.redirect('/user')
            })    
        }
    })
}

exports.updatePassword = (req, res, next) => {

    if(!req.body.newPassword){
        return next(new ErrorHandler(400, 'new_password_must_be_given'))
    }
    
    var newPassword = req.body.newPassword
    req.user.oldPassword = req.user.password
    req.user.password = newPassword

    req.user.save((err, updatedUser) => {
        if (err) return next(err)

        next() //Inform user
    })
}

exports.uploadProfilePhoto = (req, res, next) => {

    photoService.uploadUserPhoto(req, (err, filename) => {
        if (err) return next(err)

        dbService.findProfile(req.user._id, (err, profile) => {
            if(err) return next(err)

            if(profile){

                dbService.updateProfile(profile._id,{profilePicture: filename }, (err, updatedProfile) => {
                    if(err) return next(err)
                    return res.send({message: 'picture_uploaded', updatedProfile: updatedProfile})
                })
            }
        })
    })
}

exports.readProfilePhoto = (req, res, next) => {

    dbService.findProfile(req.user._id, (err, profile) => {
        if (err) return next(err)

        if(!profile || !profile.profilePicture){
            return res.sendFile(photoService.defaultProfilePicture)

        } else
            if(profile){
                return res.send('/uploads/user/' + profile.profilePicture)
        }      
        else return next(new ErrorHandler(500, 'server_error'))
    })
}

exports.readUsersProfilePhoto = (req, res, next) => {

    var userId = req.params.userId

    dbService.findProfile(userId, (err, profile) => {
        if (err) return next(err)

        if(!profile || !profile.profilePicture){
            return res.sendFile(photoService.defaultProfilePicture)

        } else
            if(profile){
                return res.send('/uploads/user/' + profile.profilePicture)
        }      
        else return next(new ErrorHandler(500, 'server_error'))
    })
}

exports.deleteProfilePhoto = (req, res, next) => {
    
    dbService.findProfile(req.user._id, (err, profile) => {
        if(err) return next(err)

        if(profile && profile.profilePicture){
            let filepath = path.join(__dirname, '../../uploads/user/', profile.profilePicture)

            photoService.deletePhoto(filepath, (err, isDeleted) => {
                if (err) return next(err)

                if(isDeleted){
                    dbService.updateProfile(profile._id, {profilePicture: undefined}, (err, updatedProfile) => {
                        if (err) return next(err)

                        return res.send({message: 'picture_deleted', updatedProfile: updatedProfile})
                    })
                }
            })
        } else if (!profile){
            return next(new ErrorHandler(400, 'profile_not_found'))

        } else if (!profile.profilePicture){    
            return next(new ErrorHandler(400, 'no_picture_to_delete'))
            
        } else return next(new ErrorHandler(500, 'server_error'))
    })
}

exports.updateProfile = (req, res, next) => {

    dbService.findProfile(req.user._id, (err, profile) => {
        if (err) return next(err)

        if(profile){

            var update = {
                name: req.body.name || profile.name,
                interestedIn: req.body.interestedIn || profile.interestedIn,
                bio: req.body.bio || profile.bio
            }

            dbService.updateProfile(profile._id, update, (err, updatedProfile) => {
                if(err) return next(err)
                return res.send({message: 'profile_updated', updatedProfile: updatedProfile})
            })
        } else if(!profile){
            return next(new ErrorHandler(400, 'profile_not_found'))
        }
    })
    
}

exports.readProfile = (req, res, next) => {

    dbService.findProfile(req.user._id, (err, profile) => {
        if(err) return next(err)

        if (!profile){
            return res.redirect('/user/createProfile')
        }

        req.user.profile = profile
        next()
    })

}

exports.readUserProfiles = (req, res, next) => {

    var userId = req.params.userId

    dbService.findProfile(userId, (err, profile) => {
        if (err) return next(err)

        if(!profile){
            return next(new ErrorHandler(404, 'profile_not_found'))
        }
        
        req.profile = profile
        next()
    })
}