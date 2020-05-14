exports.errorHandler = (err, req, res, next) => {
    if(err.code === 11000) {
        res.status(406).send({code: 01, message: 'Username is already taken!'})
    }
}

