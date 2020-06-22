var pageController = require('../controllers/page.controller')

module.exports = (app) => {

    app.use((req, res, next) => {
        next()
    }, pageController.render404)

    app.use((error, req, res, next) => {
        if(error.status == 404) return pageController.render404(req, res, next)
        return res.send({
            error: {
                status: error.status,
                message: error.message
            }
        })
    })
}