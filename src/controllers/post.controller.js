const path = require('path')
const dbService = require('../services/database.service')
const photoService = require('../services/photo.service')
const ErrorHandler = require('../helpers/error.handler')

exports.createPost = (req, res, next) => {

    var postInfo = {
        userId: req.user._id,
        username: req.user.username,
        header: req.body.header,
        text: req.body.text,
        keywords: req.body.keywords,
    }

    dbService.insertPost(postInfo, (err, post) => {
        if (err) return next(err)

        let redirectUrl = '/post/' + post._id + '/editPost'
        return res.redirect(redirectUrl)
    })
}

exports.uploadPostPhoto = (req, res, next) => {

    var postId = req.params.postId

    dbService.findPost(postId, (err, post) => {
        if (err) return next(err)

        if(post){
            photoService.uploadPostPhoto(req, (err, filename) => {
                if (err) return next(err)

                dbService.updatePost(postId, {picture: filename}, (err, updatedPost) => {
                    if (err) return next(err)

                    return res.send({message: 'photo_uploaded', updatedPost: updatedPost})
                })
            })
        } else if (!post) return next(new ErrorHandler(404, 'post_not_found'))
        else{
            return next(new ErrorHandler(500, 'server_error'))
        }
    })
}

exports.readPostPhoto = (req, res, next) => {

    var postId = req.params.postId

    dbService.findPost(postId, (err, post) => {
        if (err) return next(err)

        if(post && post.picture){
            return res.send('/uploads/post/' + post.picture)

        } else if (!post) {
            return next(new ErrorHandler(400, 'post_not_found'))

        } else if (!post.picture){
            return next(new ErrorHandler(403, 'no_picture'))

        } else return next(new ErrorHandler(500, 'server_error'))
    })
}

exports.deletePostPhoto = (req, res, next) => {

    var postId = req.params.postId

    dbService.findPost(postId, (err, post) => {
        if (err) return next(err)
        
        if(post && post.picture){
            let filepath = path.join(__dirname, '../../uploads/post/', post.picture)
            
            photoService.deletePhoto(filepath, (err, isDeleted) => {
                if (err) return next(err)

                if(isDeleted){
                    dbService.updatePost(postId, {picture: undefined}, (err, updatedPost) => {
                        if (err) return next(err)

                        return res.send({message: 'picture_deleted', updatedPost: updatedPost})
                    })
                }
            })
        } else if (!post){
            return next(new ErrorHandler(404, 'post_not_found'))

        } else if (!post.picture){
            return next(new ErrorHandler(403, 'no_picture'))

        } else return next(new ErrorHandler(500, 'server_error'))
    })
}

exports.readPost = (req, res, next) => {

    var postId = req.params.postId

    dbService.findPost(postId, (err, post) => {
        if (err) return next(err)

        if(!post) return next(new ErrorHandler(404, 'no_post_found_' + postId))

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

    var query = {isPublished: true} //To select all published posts

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

        else if (!post) return next(new ErrorHandler(404, 'post_not_found'))

        else if(!post.userId.equals(req.user._id)) return next(new ErrorHandler(401, 'unauthorized'))

        else if(post){

            var update = {
                text: req.body.text || post.text,
                header: req.body.header || post.header,
                keywords: req.body.keywords || post.keywords,
                isPublished: true
            }

            dbService.updatePost(postId, update, (err, updatedPost) => {
                if(err) return next(err)

                return res.redirect('/post/' + updatedPost._id)
            })
        }

        else return next(new ErrorHandler(500, 'server_error'))
    })

}

exports.deletePost = (req, res, next) => {

    var postId = req.params.postId

    dbService.findPost(postId, (err, post) => {

        if(err) return next(err)

        else if (!post) return next(new ErrorHandler(404, 'post_not_found'))

        else if(!post.userId.equals(req.user._id)) return next(new ErrorHandler(401, 'unauthorized'))

        else if (post) {
            dbService.deletePost(postId, (err, deletedPost) => {
                if(err) return next(err)

                if(deletedPost.picture){
                    photoService.deletePhoto(path.join(__dirname, '../../uploads/post/', deletedPost.picture), (err, isDeleted) => {
                        if (err) console.log('Error: Cannot delete picture -> ' + deletedPost.picture)
                        else if(isDeleted) console.log('Post picture deleted.')
                    })
                }

                return res.send({message: 'post_deleted', deletedPost: deletedPost})
            })
        }

        else return next(new ErrorHandler(500, 'server_error'))
    })

}

//Comment

exports.createComment = (req, res, next) => {

    var userId = req.user._id
    var postId = req.params.postId

    var commentInfo = {
        userId: userId,
        username: req.user.username,
        postId: postId,
        comment: req.body.comment
    }

    dbService.insertComment(commentInfo, (err, comment) => {
        if(err) return next(err)

        return res.redirect('/post/'+postId)
    })

}

exports.readComment = (req, res, next) => {
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

        if(comments){
            req.post.comments = comments
        }
        return next()
    })
    
}

exports.updateComment = (req, res, next) => {

    var postId = req.params.postId
    var commentId = req.params.commentId
    
    dbService.findComment(commentId, (err, comment) => {
        if(err) return next(err)

        else if(!comment) return next(new ErrorHandler(404, 'comment_not_found'))

        else if(!comment.userId.equals(req.user._id)) return next(new ErrorHandler(401, 'unauthorized'))

        else if(comment){

            var update = {
                comment: req.body.comment || comment.comment
            }

            dbService.updateComment(commentId, update, (err, updatedComment) => {
                if(err) return next(err)

                return res.send({message: 'comment_modified', newComment: updatedComment})
            })
        }

        else return next(new ErrorHandler(500, 'server_error'))
    })

}

exports.deleteComment = (req, res, next) => {

    var commentId = req.params.commentId

    dbService.findComment(commentId, (err, comment) => {
        if(err) return next(err)

        else if(!comment) return next(new ErrorHandler(404, 'comment_not_found'))

        else if(!comment.userId.equals(req.user._id)) return res.send({message: 'unauthorized'})

        else if (comment) {

            dbService.deleteComment(commentId, (err, deletedComment) => {
                if (err) return next(err)

                return res.send({message: 'comment_deleted', deletedComment: deletedComment})
            })
        }

        else return next(new ErrorHandler(500, 'server_error'))
    })
}

//Like

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

        else return next(new ErrorHandler(500, 'server_error'))
    })
    
}

exports.getLikeStatus = (req, res, next) => {

    var postId = req.params.postId
    var userId = req.user._id

    dbService.findLike(postId, userId, (err, postLike) => {
        if(err) return next(err)

        if(postLike) return res.send({message: 'likestatus', likeStatus: true})

        else return res.send({message: 'likestatus', likeStatus: false})
    })

}

exports.getLikeCount = (req, res, next) => {

    var postId = req.params.postId

    dbService.findLikes(postId, (err, postLikes) => {
        if (err) return next(err)

        return res.send({message: 'likes', postLikes: postLikes.length})
    })
}
