const Router = require('koa-router')
const { verifyauth } = require('../middleware/auth.middleware')
const { create, list } = require('../controller/label.controller')

const labelRouter = new Router({prefix: '/label'})
labelRouter.post('/create', verifyauth, create)
labelRouter.get('/list', list)

module.exports = labelRouter