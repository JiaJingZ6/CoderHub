const Router = require('koa-router')
const { verifyauth } = require('../middleware/auth.middleware')
const { create } = require('../controller/comment.controller')

const commentRouter = new Router({prefix: '/comment'})
commentRouter.post('/', verifyauth, create)


module.exports = commentRouter