const Router = require('koa-router')
const { verifyauth, verifyPermission } = require('../middleware/auth.middleware')
const { create, detail, list, update, remove } = require('../controller/moment.controller')

const momentRouter = new Router({prefix: '/moment'})

momentRouter.post('/create', verifyauth, create)
momentRouter.get('/detail/:momentID', detail)
momentRouter.get('/list', list)
momentRouter.patch('/:momentID', verifyauth, verifyPermission, update)
momentRouter.delete('/:momentID', verifyauth, verifyPermission, remove)

module.exports = momentRouter