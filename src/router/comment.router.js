const Router = require('koa-router')
const { verifyauth, verifyCommentPermission } = require('../middleware/auth.middleware')
const { create, reply, update, remove } = require('../controller/comment.controller')

const commentRouter = new Router({prefix: '/comment'})
commentRouter.post('/', verifyauth, create)
commentRouter.post('/:commentID/reply', verifyauth, reply)

commentRouter.patch('/:commentID/update', verifyauth, verifyCommentPermission, update)
commentRouter.delete('/:commentID', verifyauth, verifyCommentPermission, remove)

module.exports = commentRouter