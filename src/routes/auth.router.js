const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const pageController = require('../controllers/page.controller')

function isAuthenticated(req, res, next) {
    if(req.user){
        return res.redirect('/')
    }
    next()
}

router.get('/', pageController.indexPage)

router.get('/login', isAuthenticated, pageController.loginPage)

router.post('/login', authController.login)

router.get('/register', isAuthenticated, pageController.registerPage)

router.post('/register', authController.register)

router.get('/logout', authController.logout)

module.exports = router