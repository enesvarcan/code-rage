const path = require('path')

module.exports = (app) => {

    app.get('/', isUserProfileCreated, (req, res) => {
        res.sendFile(path.join(__dirname, '..', '..', 'views/index.html'))
    })

    app.get('/register', isLoggedIn, (req, res) => {
        res.sendFile(path.join(__dirname, '..', '..', 'views/register.html'))
    })

    app.get('/login', isLoggedIn,(req, res) => {
        res.sendFile(path.join(__dirname, '..', '..', 'views/login.html'))
    })

    app.get('/user/createProfile', (req, res) => {
        res.sendFile(path.join(__dirname, '..', '..', 'views/createProfile.html'))
    })
}


function isLoggedIn(req, res, next) {
    //If user is already logged in, user will be redirected to main page
    if(req.user) return res.redirect('/')
    next()
}

function isUserProfileCreated(req, res, next) {
    //User will be asked to create a profile if it is not already created
    if(!req.user.hasProfile) return res.redirect('/user/createProfile')
    next()
}


