const Router = require('koa-router')
const { register, login, auth } = require('../controller/user.controller')
const {
  verifyuser,
  handlePassword,
  verifylogin
} = require('../middleware/user.middleware')

const { verifyauth } = require('../middleware/auth.middleware')

const userRouter = new Router({prefix: '/user'})
userRouter.post('/register', verifyuser, handlePassword, register)
userRouter.post('/login', handlePassword, verifylogin, login)
userRouter.get('/auth', verifyauth, auth)

module.exports = userRouter