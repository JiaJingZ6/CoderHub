const Router = require('koa-router')
const { register } = require('../controller/user.controller')
const { verifyuser } = require('../middleware/user.middleware')

const userRouter = new Router({prefix: '/user'})
userRouter.post('/register', verifyuser, register)

module.exports = userRouter