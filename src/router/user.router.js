const Router = require('koa-router')
const { register } = require('../controller/user.controller')

const userRouter = new Router({prefix: '/user'})
userRouter.post('/register', register)

module.exports = userRouter