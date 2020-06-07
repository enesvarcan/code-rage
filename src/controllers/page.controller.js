const path = require('path')

exports.loginPage = (req, res, next) => {

    console.log('render login page')
    //if req.get('Warning'=='Not Logged In') then warn user 
    return res.sendFile(path.join(__dirname, '../../views/login.html'))
}

exports.registerPage = (req, res, next) => {
    console.log('render register page')
    return res.sendFile(path.join(__dirname, '../../views/register.html'))

}

exports.indexPage = (req, res, next) => {

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

exports.userProfilePage = (req, res, next) => {
    console.log('render user profile page')
    return res.send('user profile page')
}

exports.userProfileCreatePage = (req, res, next) => {
    console.log('render user profile creation page')
    return res.sendFile(path.join(__dirname, '../../views/createProfile.html'))
}

exports.userProfileEditPage = (req, res, next) => {
    console.log('render edit page of user profile')
    return res.send('edit user profile')
}

exports.userPostsPage = (req, res, next) => {
    console.log('render user\'s posts')
    return res.send('my posts')
}