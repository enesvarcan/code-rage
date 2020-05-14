exports.register = (req, res, next) => {

    console.log(req.body);
    

    var userInfo = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }

    req.userInfo = userInfo
    next()
}