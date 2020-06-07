const router = require('express').Router()
const pageController = require('../controllers/page.controller')
const userController = require('../controllers/user.controller')

router.use(function isAuthenticated(req, res, next) {

    if(!req.user){

        //To warn user about redirection(user must be logged in): res.append('Warning', 'Not Logged In')
        return res.redirect(401, '/login')
    }
})

router.get('/user', pageController.userProfilePage)

router.post('/user', userController.createProfile)

router.get('/user/editProfile', pageController.userProfileEditPage)

router.patch('/user/editProfile', userController.updateProfile)

router.get('/user/myPosts', pageController.userPostsPage)


module.exports = router