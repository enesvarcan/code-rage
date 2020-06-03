const path = require('path')

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '..', '..', 'views/index.html'))
    })

    app.get('/register', isLoggedIn, (req, res) => {
        res.sendFile(path.join(__dirname, '..', '..', 'views/register.html'))
    })

    app.get('/login', isLoggedIn,(req, res) => {
        res.sendFile(path.join(__dirname, '..', '..', 'views/login.html'))
    })
}


function isLoggedIn(req, res, next) {
    if(req.user) return res.redirect('/')
    next()
}


