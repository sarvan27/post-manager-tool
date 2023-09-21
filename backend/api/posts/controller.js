const postList = require('./post-list')

const getAllPosts = (req, res, next) => {
  try {
    res.send({ status: 200, message: 'Ok', list: postList })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllPosts
}
