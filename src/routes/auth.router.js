const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const pageController = require('../controllers/page.controller')

function isAuthenticated(req, res, next) {
    if(req.user){
        return res.redirect('/')
    }
    next()
}

router.get('/', pageController.renderIndex)

router.get('/login', isAuthenticated, pageController.renderLogin)

router.post('/login', isAuthenticated, authController.login)

router.get('/register', isAuthenticated, pageController.renderLogin)

router.post('/register', isAuthenticated, authController.register)

router.get('/logout', authController.logout)

module.exports = router