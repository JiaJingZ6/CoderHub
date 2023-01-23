const Router = require('koa-router')
const { register } = require('../controller/user.controller')
const { verifyuser, handlePassword } = require('../middleware/user.middleware')

const userRouter = new Router({prefix: '/user'})
userRouter.post('/register', verifyuser, handlePassword, register)

module.exports = userRouter