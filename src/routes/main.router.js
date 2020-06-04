const userController = require('../controllers/user.controller')

module.exports = (app) => {

    app.post('/register', userController.register)

    app.post('/login', userController.login)

    app.post('/user/createProfile', userController.createProfile)
}