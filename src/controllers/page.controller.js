const path = require('path')

//Auth

exports.renderLogin = (req, res, next) => {

    console.log('render login page')
    //if req.get('Warning'=='Not Logged In') then warn user 
    return res.sendFile(path.join(__dirname, '../../views/login.html'))
}

exports.renderRegister = (req, res, next) => {
    console.log('render register page')
    return res.sendFile(path.join(__dirname, '../../views/register.html'))

}

//User

exports.renderIndex = (req, res, next) => {

    //render index page
    if(!req.user){
        console.log('render welcome page(user is not logged in)')
        return res.sendFile(path.join(__dirname, '../../views/index.html'))
    }
    else{
        console.log('render user page(user is logged in)')
        return res.sendFile(path.join(__dirname, '../../views/userIndex.html'))
    }

}

exports.renderProfile = (req, res, next) => {
    console.log('render user profile page')
    return res.send(req.user.profile)
}

exports.renderProfileCreate = (req, res, next) => {
    console.log('render user profile creation page')
    return res.sendFile(path.join(__dirname, '../../views/createProfile.html'))
}

exports.renderProfileEdit = (req, res, next) => {
    console.log('render edit page of user profile')
    return res.send('edit user profile')
}

exports.renderUserPosts = (req, res, next) => {
    console.log('render user\'s posts')
    return res.send('my posts')
}

//Post

exports.renderAllPosts = (req, res, next) => {

}

exports.renderPost = (req, res, next) => {

}

exports.renderPostEdit = (req, res, next) => {

}

exports.renderPostCreate = (req, res, next) => {

}

exports.renderCommentCreate = (req, res, next) => {

}

exports.renderComment = (req, res, next) => {
    
}