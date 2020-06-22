const User = require('../models/user.model')
const UserProfile = require('../models/user.profile.model')
const Post = require('../models/post.model')
const Comment = require('../models/comment.model')
const PostLike = require('../models/post.like.model')
const PostComment = require('../models/post.comment.model')
const ErrorHandler = require('../helpers/error.handler')
/*
    Database service for controllers
    Create,Read,Update,Delete(CRUD) -> insert..(), find..(), update..(), remove..()  
*/

//User

exports.insertUser = (userInfo, cb) => {

    var user = new User(userInfo)

    user.save((err, usr) => {
        if (err && err.code == 11000) {
            if(err.keyValue){
                return cb(new ErrorHandler(400, 'username_is_taken'))
            } else if(err.errors){
                return cb(new ErrorHandler(400, 'fill_all_required_fields'))
            }
        } else if(err) return cb(new ErrorHandler(500, 'database_error'))

        return cb(null, usr)
    })
}

exports.updateUser = (userId, update, cb) => {

    User.findByIdAndUpdate(userId, {$set: update}, {new: true}, (err, updatedUser) => {
        if (err) return cb(new ErrorHandler(500, 'cannot_update_user_' + userId))

        return cb(null, updatedUser)
    })  
}

exports.findUserByEmail = (email, cb) => {

    User.findOne({email: email}, (err, user) => {
        if (err) return cb(new ErrorHandler(500, 'cannot_find_user_' + email))

        return cb(null, user)
    })
}

//Profile

exports.insertProfile = (profileInfo, cb) => {
    var userProfile = new UserProfile(profileInfo)

    userProfile.save((err, usrProfile) => {
        if (err && err.code == 11000) {
            if(err.keyValue){
                return cb(new ErrorHandler(400, 'profile_already_created'))
            } else if(err.errors){
                return cb(new ErrorHandler(400, 'fill_all_required_fields'))
            }
        } else if(err) return cb(new ErrorHandler(500, 'database_error'))

        return cb(null, usrProfile)
    })
}

exports.updateProfile = (profileId, update, cb) => {

    UserProfile.findByIdAndUpdate(profileId, {$set: update}, {new: true}, (err, updatedProfile) => {
        if(err) return cb(new ErrorHandler(500, 'cannot_update_profile_' + profileId))

        return cb(null, updatedProfile)
    })
}

exports.findProfile = (userId, cb) => {

    UserProfile.findOne({userId: userId}, (err, profile) => {
        if(err) return cb(new ErrorHandler(500, 'cannot_find_profile' + userId))

        return cb(null, profile)
    })
}

//Post

exports.insertPost = (postInfo, cb) => {

    var post = new Post(postInfo)

    post.save((err, pst) => {
        if(err && err.code == 11000 && err.errors){
            return cb(new ErrorHandler(400, 'fill_all_required_fields'))

        } else if(err) return cb(new ErrorHandler(500, 'database_error'))

        return cb(null, pst)
    })
}

exports.findPost = (postId, cb) => {

    Post.findById(postId, (err, post) => {
        if(err) return cb(new ErrorHandler(500, 'cannot_find_post_' + postId))

        return cb(null, post)
    })
}

exports.findPosts = (query, cb) => {
    
    Post.find(query, (err, posts) => {
        if (err) return cb(new ErrorHandler(500, 'cannot_find_post(s)'))

        return cb(null, posts)
    })
}

exports.updatePost = (postId, update, cb) => {

    Post.findByIdAndUpdate({_id: postId}, {$set: update}, {new: true}, (err, updatedPost) => {
        if(err) return cb(new ErrorHandler(500, 'cannot_update_post_' + postId))

        return cb(null, updatedPost)
    })
}

exports.deletePost = (postId, cb) => {

    Post.findByIdAndRemove(postId, (err, deletedPost) => {
        if(err) return cb(new ErrorHandler(500, 'cannot_delete_post_' + postId))

        return cb(null, deletedPost)
    })
}

//Comment

exports.insertComment = (commentInfo, cb) => {

    var comment = new PostComment(commentInfo)

    comment.save((err, cmt) => {
        if(err && err.code == 11000 && err.keyValue) return cb(new ErrorHandler(400, 'user_already_commented'))

        else if(err && err.errors) return cb(new ErrorHandler(400, 'fill_all_required_fields'))

        else if (err) return cb(new ErrorHandler(500, 'database_error'))

        return cb(null, cmt)
    })
}

exports.findComment = (commentId, cb) => {

    PostComment.findById(commentId, (err, comment) => {
        if (err) return cb(new ErrorHandler(500, 'cannot_find_comment' + comment))

        return cb(null, comment)
    })
}

exports.findPostComments = (postId, cb) => {

    PostComment.find({postId: postId}, (err, comments) => {
        if (err) return cb(new ErrorHandler(500, 'cannot_find_comments_of_post_' + postId))

        return cb(null, comments)
    })
}

exports.updateComment = (commentId, update, cb) => {

    PostComment.findByIdAndUpdate(commentId, update, {new: true}, (err, updatedComment) => {
        if (err) return cb(new ErrorHandler(500, 'cannot_update_comment_' + commentId))

        return cb(null, updatedComment) 
    })
}

exports.deleteComment = (commentId, cb) => {

    PostComment.findByIdAndRemove(commentId, (err, deletedComment) => {
        if (err) return cb(new ErrorHandler(500, 'cannot_delete_comment_' + commentId))

        return cb(null, deletedComment)
    })
}

//Like

exports.findLike = (postId, userId, cb) => {

    PostLike.findOne({postId: postId, userId: userId}, (err, postLike) => {
        if (err) return cb(new ErrorHandler(500, 'cannot_find_like_of_post_' + postId))

        return cb(null, postLike)
    })
}

exports.findLikes = (postId, cb) => {

    PostLike.find({postId: postId}, (err, postLikes) => {
        if (err) return cb(new ErrorHandler(500, 'cannot_find_likes_of_post_' + postId))

        return cb(null, postLikes)
    })
}

exports.insertLike = (postLikeInfo, cb) => {

    var postLike = new PostLike(postLikeInfo)

    postLike.save((err, pstLike) => {
        if(err) return cb(new ErrorHandler(500, 'database_error'))

        return cb(null, pstLike)
    })

}

exports.deleteLike = (likeId, cb) => {

    PostLike.findByIdAndRemove(likeId, (err, deletedLike) => {
        if (err) return cb(new ErrorHandler(500, 'cannot_delete_like_' + likeId))

        return cb(null, deletedLike)
    })
}
    
