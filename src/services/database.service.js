const User = require('../models/user.model')
const UserProfile = require('../models/user.profile.model')
const Post = require('../models/post.model')
const Comment = require('../models/comment.model')
const PostLikes = require('../models/post.likes.model')
const PostComments = require('../models/post.comments.model')

exports.saveUser = (userInfo, cb) => {

    var user = new User(userInfo)

    user.save((err, u) => {
        if (err) return cb(err)

        return cb(false, {code: 00, message: 'Registration Complete!'})
    })
}

exports.saveUserProfile = () => {

}

    
