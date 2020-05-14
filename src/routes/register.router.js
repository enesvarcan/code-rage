const registerController = require('../controllers/register.controller')
const pageController = require('../controllers/page.controller')
const registerMiddleware = require('../middlewares/register.mw')

module.exports = (app) => {

    app.post('/register', registerController.register, registerMiddleware.saveUserIntoDB)

    app.get('/register', pageController.registerPage)
}