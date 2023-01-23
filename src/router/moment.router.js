const Router = require('koa-router')
const { verifyauth } = require('../middleware/user.middleware')
const { create } = require('../controller/moment.controller')

const momentRouter = new Router({prefix: '/moment'})

momentRouter.post('/create', verifyauth, create)

module.exports = momentRouter