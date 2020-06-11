const dbService = require('../services/database.service')
const photoService = require('../services/photo.service')

exports.createPost = (req, res, next) => {

    var postInfo = {
        userId: req.user._id,
        header: req.body.header,
        text: req.body.text,
        picture: 'path',
        keywords: req.body.keywords,
    }

    dbService.insertPost(postInfo, (err, post) => {
        if (err) return next(err)

        return res.send({message: 'post_created', post: post})
    })
}

exports.readPost = (req, res, next) => {

    var postId = req.params.postId

    dbService.findPost(postId, (err, post) => {
        if (err) return next(err)

        req.post = post
        return next()
    })

}

exports.readUserPosts = (req, res, next) => {

    var query = {userId: req.user._id}

    dbService.findPosts(query, (err, posts) => {
        if(err) return next(err)

        req.user.posts = posts
        return next()
    })

}

exports.readAllPosts = (req, res, next) => {

    var query = {} //To select all posts

    dbService.findPosts(query, (err, posts) => {
        if (err) return next(err)

        req.posts = posts
        next()
    })

}

exports.updatePost = (req, res, next) => {

    var postId = req.params.postId
    dbService.findPost(postId, (err, post) => {

        if (err) return next(err)

        else if (!post) return res.send({message: 'post_not_found'})

        else if(!post.userId.equals(req.user._id)) return res.send({message: 'unauthorized'})

        else if(post){

            var update = {
                text: req.body.text || post.text,
                header: req.body.header || post.header,
                picture: photoService.updatePhoto(req.body.picture) || post.picture,
                keywords: req.body.keywords || post.keywords
            }

            dbService.updatePost(postId, update, (err, updatedPost) => {
                if(err) return next(err)

                return res.send({message: 'post_updated', newPost: updatedPost})
            })
        }
    })

}

exports.deletePost = (req, res, next) => {

    var postId = req.params.postId

    dbService.findPost(postId, (err, post) => {

        if(err) return next(err)

        else if (!post) return res.send({message: 'post_not_found'})

        else if(!post.userId.equals(req.user._id)) return res.send({message: 'unauthorized'})

        else if (post) {
            dbService.deletePost(postId, (err, deletedPost) => {
                if(err) return next(err)
    
                return res.send({message: 'post_deleted', deletedPost: deletedPost})
            })
        }

        else return res.send({message: 'unknown_error'})
    })

}

exports.createComment = (req, res, next) => {

    var userId = req.user._id
    var postId = req.params.postId

    var commentInfo = {
        userId: userId,
        postId: postId,
        comment: req.body.comment
    }

    dbService.insertComment(commentInfo, (err, comment) => {
        if(err) return next(err)

        return res.send({message: 'comment_added', comment: comment})
    })

}

exports.readComment = (req, res, next) => {
    //Do we need this?
    var commentId = req.params.commentId

    dbService.findComment(commentId, (err, comment) => {
        if(err) return next(err)

        req.comment = comment
        next()
    })
}

exports.readAllComments = (req, res, next) => {

    var postId = req.params.postId

    dbService.findPostComments(postId, (err, comments) => {
        if (err) return next(err)

        req.post.comments = comments
        return next()
    })
    
}

exports.updateComment = (req, res, next) => {

    var postId = req.params.postId
    var commentId = req.params.commentId
    
    dbService.findComment(commentId, (err, comment) => {
        if(err) return next(err)

        else if(!comment) return res.send({message: 'comment_not_found'})

        else if(!comment.userId.equals(req.user._id)) return res.send({message: 'unauthorized'})

        else if(comment){

            var update = {
                comment: req.body.comment || comment.comment
            }

            dbService.updateComment(commentId, update, (err, updatedComment) => {
                if(err) return next(err)

                return res.send({message: 'comment_modified', newComment: updatedComment})
            })
        }

        else return res.send({message: 'unknown_error'})
    })

}

exports.deleteComment = (req, res, next) => {

    var commentId = req.params.commentId

    dbService.findComment(commentId, (err, comment) => {
        if(err) return next(err)

        else if(!comment) return res.send({message: 'comment_not_found'})

        else if(!comment.userId.equals(req.user._id)) return res.send({message: 'unauthorized'})

        else if (comment) {

            dbService.deleteComment(commentId, (err, deletedComment) => {
                if (err) return next(err)

                return res.send({message: 'comment_deleted', deletedComment: deletedComment})
            })
        }

        else return res.send({message: 'unknown_error'})
    })
}

exports.changeLikeStatus = (req, res, next) => {

    var postId = req.params.postId
    var userId = req.user._id

    dbService.findLike(postId, userId, (err, postLike) => {
        if (err) return next(err)

        //If the user have not liked the post, insert like
        else if (!postLike){
            var postLikeInfo = {
                userId: req.user._id,
                postId: postId
            }

            dbService.insertLike(postLikeInfo, (err, postLike) => {
                if (err) return next(err)

                return res.send({message: 'post_liked', postId: postId})
            })
        }

        //If user have liked the post, delete like
        else if(postLike){

            dbService.deleteLike(postLike._id, (err, deletedLike) => {
                if (err) return next(err)

                return res.send({message: 'post_like_removed', postId: postId})
            })

            
        }
    })
    
}
