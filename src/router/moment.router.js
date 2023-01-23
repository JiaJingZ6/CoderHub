const Router = require('koa-router')
const { verifyauth } = require('../middleware/user.middleware')
const { create, detail, list } = require('../controller/moment.controller')

const momentRouter = new Router({prefix: '/moment'})

momentRouter.post('/create', verifyauth, create)
momentRouter.get('/detail/:momentID', detail)
momentRouter.get('/list', list)

module.exports = momentRouter