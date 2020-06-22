const Fuse = require('fuse.js')

exports.searchPosts = (req, res, next) => {

    var options = {
        includeScore: true,
        keys: ['header', 'text', 'keywords']
    }

    var results = new Fuse(req.posts, options).search(req.query.q)

    req.search = {results: results}
    next()
}