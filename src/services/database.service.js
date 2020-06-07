const User = require('../models/user.model')
const UserProfile = require('../models/user.profile.model')
const Post = require('../models/post.model')
const Comment = require('../models/comment.model')
const PostLike = require('../models/post.like.model')
const PostComment = require('../models/post.comment.model')
/*
    Database service for controllers
    Create,Read,Update,Delete(CRUD) -> insert..(), find..(), update..(), remove..()  
*/

//User

exports.insertUser = (userInfo, cb) => {

    var user = new User(userInfo)

    user.save((err, usr) => {
        if (err) return cb(err)

        return cb(null, usr)
    })
}

exports.updateUser = (userId, update, cb) => {

    User.findByIdAndUpdate(userId, {$set: update}, {new: true}, (err, updatedUser) => {
        if (err) return cb(err)

        return cb(null, updatedUser)
    })  
}

//Profile

exports.insertProfile = (profileInfo, cb) => {
    var userProfile = new UserProfile(profileInfo)

    userProfile.save((err, usrProfile) => {
        if(err) return cb(err)

        return cb(null, usrProfile)
    })
}

exports.updateProfile = (profileId, update, cb) => {

    UserProfile.findByIdAndUpdate(profileId, {$set: update}, {new: true}, (err, updatedProfile) => {
        if(err) return cb(err)

        return cb(null, updatedProfile)
    })
}

exports.findProfile = (userId, cb) => {

    UserProfile.findById(userId, (err, profile) => {
        if(err) return cb(err)

        return cb(null, profile)
    })
}

//Post

exports.insertPost = (userId, postInfo, cb) => {

    var post = new Post(postInfo)
    post.userId = userId

    post.save((err, pst) => {
        if(err) return cb(err)

        return cb(null, pst)
    })
}

exports.findPost = (postId, cb) => {

    Post.findById(postId, (err, post) => {
        if(err) return cb(err)

        return cb(null, post)
    })
}

exports.updatePost = (postId, update, cb) => {

    Post.findByIdAndUpdate({_id: postId}, {$set: update}, {new: true}, (err, updatedPost) => {
        if(err) return cb(err)

        return cb(null, updatedPost)
    })
}

exports.deletePost = (postId, cb) => {

    Post.findByIdAndRemove(postId, (err, deletedPost) => {
        if(err) return cb(err)

        return cb(null, deletedPost)
    })
}

//Comment

exports.insertComment = (userId, postId, commentInfo, cb) => {

    var comment = new PostComment(commentInfo)
    comment.userId = userId
    comment.postId = postId

    comment.save((err, cmt) => {
        if (err) return cb(err)

        return cb(null, cmt)
    })
}

exports.findComment = (commentId, cb) => {

    PostComment.findById(commentId, (err, comment) => {
        if (err) return cb(err)

        return cb(null, comment)
    })
}

exports.updateComment = (commentId, update, cb) => {

    PostComment.findByIdAndUpdate(commentId, update, (err, updatedComment) => {
        if (err) return cb(err)

        return cb(null, updatedComment) 
    })
}

exports.deleteComment = (commentId, cb) => {

    PostComment.findByIdAndRemove(commentId, (err, deletedComment) => {
        if (err) return cb(err)

        return cb(null, deletedComment)
    })
}

//Like

exports.insertLike = (userId, postId, cb) => {

    var postLike = new PostLike({
        userId: userId,
        postId: postId
    })

    postLike.save((err, pstLike) => {
        if (err) return cb(err)

        return cb(null, pstLike)
    })

}

exports.deleteLike = (likeId, cb) => {

    PostLike.findByIdAndRemove(likeId, (err, deletedLike) => {
        if (err) return cb(err)

        return cb(null, deletedLike)
    })
}
    
