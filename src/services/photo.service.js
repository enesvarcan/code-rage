const path = require('path')
const fs = require('fs')
const ErrorHandler = require('../helpers/error.handler')

exports.uploadUserPhoto = (req, cb) => {

    checkFileStructure()

    if(!req.files ||!req.files.profilePicture){
        return cb(new ErrorHandler(400, 'no_files_uploaded'))
    } 
    else {
        var file = req.files.profilePicture

        if(file.mimetype == 'image/jpeg'){
            let uploadpath = path.join(__dirname, '../../uploads/user/')
            let filename = req.user._id + '.' + file.name.split('.')[1]
            let filepath = uploadpath + filename

            file.mv(filepath, function (err) {
                if (err) return cb(new ErrorHandler(500, 'server_error'))
                return cb(null, filename)
            })
        } else return cb(new ErrorHandler(403, 'wrong_mimetype'))  
    }
}

exports.uploadPostPhoto = (req, cb) => {

    checkFileStructure()

    if(!req.files || !req.files.picture){
        return cb(new ErrorHandler(400, 'no_files_uploaded'))
    }
    else{
        var file = req.files.picture

        if(file.mimetype == 'image/jpeg'){
            let uploadpath = path.join(__dirname, '../../uploads/post/')
            let filename = req.params.postId + '.' + file.name.split('.')[1]
            let filepath = uploadpath + filename

            file.mv(filepath, function(err) {
                if(err) return cb(new ErrorHandler(500, 'server_error'))
                return cb(null, filename)
            })
        } else return cb(new ErrorHandler(403, 'wrong_mimetype'))
    }
}

exports.deletePhoto = (path, cb) => {

    fs.unlink(path, (err) => {
        if (err) return cb(new ErrorHandler(500, 'server_error'))

        else return cb(null, true)
    })

}

function checkFileStructure(){
    const uploadsDir = path.join(__dirname, '../../uploads')
    const userDir = path.join(__dirname, '../../uploads/user')
    const postDir = path.join(__dirname, '../../uploads/post')

    if(!fs.existsSync(uploadsDir)){
        fs.mkdirSync(uploadsDir)
    }
    if (!fs.existsSync(userDir)){
        fs.mkdirSync(userDir)
    }
    if(!fs.existsSync(postDir)){
        fs.mkdirSync(postDir)
    }
}

exports.defaultProfilePicture = path.join(__dirname, '../../uploads/user/default.jpg')
