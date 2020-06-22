const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const pageController = require('../controllers/page.controller')
const mailController = require('../controllers/mail.controller')
const postController = require('../controllers/post.controller')

function isAuthenticated(req, res, next) {
    if(req.user){
        return res.redirect('/')
    }
    next()
}

router.get('/', pageController.renderIndex)

router.get('/login', isAuthenticated)

router.post('/login', isAuthenticated, authController.login)

router.get('/register', isAuthenticated)

router.post('/register', isAuthenticated, authController.register, mailController.welcome)

router.get('/forgotPassword', isAuthenticated, pageController.renderForgotPassword)

router.post('/forgotPassword', isAuthenticated, authController.createToken, mailController.forgotPassword)

router.get('/forgotPassword/:token', isAuthenticated, authController.verifyToken, pageController.renderForgotPasswordChange)

router.post('/forgotPassword/:token', isAuthenticated, authController.verifyToken, authController.changePassword)

router.get('/logout', authController.logout)

module.exports = router