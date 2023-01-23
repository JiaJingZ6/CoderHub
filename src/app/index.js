const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const userRouter = require('../router/user.router')
const momentRouter = require('../router/moment.router')
const errorHandler = require('../app/errorHandler')

const app = new Koa()

app.use(bodyParser())
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(momentRouter.routes()).use(momentRouter.allowedMethods())

app.on('error', errorHandler)

module.exports = app