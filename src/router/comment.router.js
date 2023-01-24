const Router = require('koa-router')
const { verifyauth } = require('../middleware/auth.middleware')
const { create, reply } = require('../controller/comment.controller')

const commentRouter = new Router({prefix: '/comment'})
commentRouter.post('/', verifyauth, create)
commentRouter.post('/:commentID/reply', verifyauth, reply)


module.exports = commentRouter