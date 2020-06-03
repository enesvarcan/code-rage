const databaseMW = require('../middlewares/database.mw')
const userController = require('../controllers/user.controller')

module.exports = (app) => {

    app.post('/register', userController.register, databaseMW.saveUserIntoDB)

    app.post('/login', userController.login)
}