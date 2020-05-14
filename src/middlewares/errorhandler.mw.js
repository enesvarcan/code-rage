exports.errorHandler = (err, req, res, next) => {
    if(err.code === 11000) {
        res.status(406).send({code: 01, message: 'Username is already taken!'})
    }

    if(err.errors){
        if(err.errors.username || err.errors.email || err.errors.password){
            res.status(400).send({code: 02, message: 'Fill all required fields!'})
        }
    }
}

