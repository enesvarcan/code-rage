const User = require('../models/user.model')
const UserProfile = require('../models/user.profile.model')
const Post = require('../models/post.model')
const Comment = require('../models/comment.model')
const PostLikes = require('../models/post.likes.model')
const PostComments = require('../models/post.comments.model')
/*
    Database service for controllers
    Create,Read,Update,Delete -> insert..(), find..(), update..(), remove..()  
*/

exports.insertUser = (userInfo, cb) => {

    var user = new User(userInfo)

    user.save((err, u) => {
        if (err) return cb(err)

        return cb(null, u)
    })
}

exports.updateUser = (user, update, cb) => {

    User.findOneAndUpdate({_id: user._id}, {$set: update}, {new: true}, (err, uu) => {
        if (err) cb(err)

        return cb(null, uu)
    })

    
}

exports.insertUserProfile = (profileInfo, cb) => {
    var userProfile = new UserProfile(profileInfo)

    userProfile.save((err, up) => {
        if(err) return cb(err)

        return cb(null, up)
    })
}

exports.updateUserProfile = () => {

}

exports.findUserProfile = () => {

}


exports.insertPost = () => {

}

exports.findPost = () => {

}

exports.updatePost = () => {

}

exports.deletePost = () => {

}

exports.insertComment = () => {

}

exports.findComment = () => {

}

exports.updateComment = () => {

}

exports.deleteComment = () => {

}



    
