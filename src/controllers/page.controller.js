const path = require('path')

exports.loginPage = (req, res, next) => {

    //render login page
    console.log('render login page')
    //if req.get('Warning') then 
    return res.sendFile(path.join(__dirname, '../../views/login.html'))
}

exports.registerPage = (req, res, next) => {

    //render register page
    console.log('render register page')
    return res.sendFile(path.join(__dirname, '../../views/register.html'))

}

exports.indexPage = (req, res, next) => {

    //render index page
    if(!req.user){
        //render welcome page
        console.log('render welcome page(user is not logged in)')
        return res.sendFile(path.join(__dirname, '../../views/index.html'))
    }
    else{
        //render user page
        console.log('render user page(user is logged in)')
        return res.sendFile(path.join(__dirname, '../../views/UserIndex.html'))
    }

}

exports.userProfilePage = (req, res, next) => {
    //render user profile page
    console.log('render user profile page')
    return res.send('user profile page')
}