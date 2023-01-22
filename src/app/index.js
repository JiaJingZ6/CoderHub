const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const userRouter = require('../router/user.router')

const app = new Koa()

app.use(bodyParser())
app.use(userRouter.routes()).use(userRouter.allowedMethods())

module.exports = app