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

        return cb(false, {code: 00, message: 'Registration Complete!'})
    })
}

exports.insertUserProfile = () => {

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



    
