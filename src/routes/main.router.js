const router = require('express').Router()
const pageController = require('../controllers/page.controller')

router.use(function isAuthenticated(req, res, next) {

    if(!req.user){

        //To warn user about redirection(user must be logged in): res.append('Warning', 'Not Logged In')
        return res.redirect(401, '/login')
    }
})

router.get('/user', pageController.userProfilePage)

/* router.get('/user/edit', pageController.userProfileEditPage)

router.patch('/user/edit')

router.get('/user/myPosts')

router.delete('/user/myPosts/:postId') */

module.exports = router