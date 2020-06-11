const path = require('path')

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

    return res.send('render register page')
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
    return res.render('index', {user: req.user})

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
 
    return res.send('render user profile page')
}

exports.renderProfileCreate = (req, res, next) => {

    //No data needed

    return res.send('render user profile creation page')
}

exports.renderProfileEdit = (req, res, next) => {

    //User Profile object needed(to write default values to the input field)
    // -req.user.profile

    return res.send('edit user profile')
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

    return res.send('my posts')
}

//Post

exports.renderAllPosts = (req, res, next) => {

    /*
    All posts are needed

    -req.posts -> JavaScript object containing posts
                foreach(post in posts)...
    */

    //return res.send(`render all posts\n${req.posts}`)
    return res.render('overview', {posts: req.posts})

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

        return res.render('single-post-view', {post: req.post})

}

exports.renderPostEdit = (req, res, next) => {

    //Post needed
    // -req.post
    return res.send('render edit post page')

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