const Router = require('koa-router')
const { verifyauth, verifyCommentPermission } = require('../middleware/auth.middleware')
const { create, reply, update } = require('../controller/comment.controller')

const commentRouter = new Router({prefix: '/comment'})
commentRouter.post('/', verifyauth, create)
commentRouter.post('/:commentID/reply', verifyauth, reply)

commentRouter.patch('/:commentID/update', verifyauth, verifyCommentPermission, update)

module.exports = commentRouter