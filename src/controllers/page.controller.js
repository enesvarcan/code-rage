const path = require('path')
const dbService = require('../services/database.service')
const { profile } = require('console')

/*
===========
INFORMATION
===========

This controller is only written for rendering pages. Some pages need objects to display data.
These data need to be passed to the res.render() function. Here's an example for that:

    -res.render('userposts', {user: req.user, posts: req.user.posts})

    In this line of code, 'userposts' argument declares that userpost.ejs file will be used.
    Second object defines which objects will be used inside of userposts.ejs file. Now,
    you can access 'req.user' object as 'user' inside of the ejs file. Similar for the 
    posts. 'req' object is created by Express and it is passed while handling the request
    between middleware functions and it can be altered. 'user' object is added to 'req'
    object after authentication by Passport and 'posts' object is added after gathering
    posts from database by post.controller. If you need to add some other data then 
    these, you need to attach them into the 'req' object inside the controller.

I wrote some information about the needed objects but it may be not enough. For example,
if an user is logged in, username must be displayed in every page. That is why you
should always pass req.user object to render function. There may be another cases which
I did not cover, so please consider this.

*/

//Auth

exports.renderLogin = (req, res, next) => {

    //No data needed to render this page

    return res.render('login')
}

exports.renderRegister = (req, res, next) => {

    //No data needed to render this page

    return res.render('register')
}

exports.renderForgotPassword = (req, res, next) => {

    //No data needed to render this page

    return res.send('render forgot password page')
}

exports.renderForgotPasswordChange = (req, res, next) => {

    //No data needed to render this page

    return res.send('render change password page for forgotten password')
}

//User

exports.renderIndex = (req, res, next) => {

    /*
    User object needed to render if user is logged in (this can be checked inside of the index.ejs file, if(user) then render user info; else render login and register buttons)

    -req.user
            ._id: user id
            .username
            .email
            .password: hashed password of the user (DO NOT RENDER)
            .hasProfile: boolean value, tells if a user has a profile or not
    */

    //render index page
    if(!req.user){
        return res.render('home')
    } else{
        return res.redirect('/posts')
    }

}

exports.renderChangePassword = (req, res, next) => {

    //No data needed 

    return res.send('render change password page')
}

exports.renderProfile = (req, res, next) => {

    /*
    User Profile object needed

    -req.user.profile
                    ._id: profile id
                    .userId
                    .email
                    .name
                    .profilePicture: stored in the filesystem, can be default if not supplied
                    .interestedIn
                    .bio
                    .timestamp: Date, time of creation of the profile

    */
    return res.render('profile', {user: req.user, profile: req.user.profile, userProfile: req.user.profile})
}

exports.renderUserProfiles = (req, res, next) => {

    return res.render('profile', {user: req.user, profile: req.user.profile, userProfile: req.profile})
}

exports.renderProfileCreate = (req, res, next) => {

    //No data needed

    dbService.findProfile(req.user._id, (err, profile) =>{
        if (err) return next(err)

        if(profile) return res.redirect('/user')

        return res.render('create-profile', {user: req.user, profile: req.user.profile})
    })
}

exports.renderProfileEdit = (req, res, next) => {

    //User Profile object needed(to write default values to the input field)
    // -req.user.profile

    return res.render('edit-profile', {user: req.user, profile: req.user.profile})
}

exports.renderUserPosts = (req, res, next) => {

    /*
    All posts which are written by user are needed

    -req.user.posts -> JavaScript object containing posts
                foreach(post in posts){
                    post
                        ._id
                        .userId
                        .header: header of the post
                        .text: content of the post
                        .picture
                        .keywords: Array, can be useful for searching
                        .timestamp
                }
    */

    return res.render('overview-user', {user: req.user, profile: req.user.profile, posts: req.user.posts})
}

//Post

exports.renderAllPosts = (req, res, next) => {

    /*
    All posts are needed

    -req.posts -> JavaScript object containing posts
                foreach(post in posts)...
    */
    return res.render('overview', {user: req.user, profile: req.user.profile, posts: req.posts})

}

exports.renderPost = (req, res, next) => {

    /*
    Post selected by user and its comments are needed
    -req.post -> One JavaScript object containing post data
    -req.post.comments -> JavaScript object containing comments of the post 
                foreach(comment in comments)
                    comment
                        ._id
                        .userId
                        .postId
                        .comment: comment content as String
                        .timestamp
    */

    /* return res.send(`render selected post: ${req.post}
                    with comments: ${req.post.comments}`) */

        return res.render('single-post-view', {user: req.user, profile: req.user.profile, post: req.post, comments: req.post.comments})

}

exports.renderPostEdit = (req, res, next) => {

    //Post needed
    // -req.post

    if(!req.post.userId.equals(req.user._id)) return res.redirect('/')

    return res.render('edit-post', {user: req.user, profile:req.user.profile, post: req.post})

}

exports.renderPostCreate = (req, res, next) => {

    //No data needed
    return res.send('render create post page')
}

exports.renderCommentCreate = (req, res, next) => {

    //No data needed
    return res.send('render add comment page')

}

exports.renderComment = (req, res, next) => {

    // Comment object needed
    // -req.comment
    return res.send(`comment: ${req.comment}`)
}

exports.renderSearchResults = (req, res, next) => {

    return res.render('search', {user: req.user, profile: req.user.profile, term: req.query.q, results: req.search.results})
}

exports.render404 = (req, res, next) => {

    return res.render('404')
}