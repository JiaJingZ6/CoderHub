const Router = require('koa-router')
const { register, login } = require('../controller/user.controller')
const { verifyuser, handlePassword, verifylogin } = require('../middleware/user.middleware')

const userRouter = new Router({prefix: '/user'})
userRouter.post('/register', verifyuser, handlePassword, register)
userRouter.post('/login', handlePassword, verifylogin, login)

module.exports = userRouter