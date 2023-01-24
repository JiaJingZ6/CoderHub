const Router = require('koa-router')
const { verifyauth, verifyMomentPermission } = require('../middleware/auth.middleware')
const { create, detail, list, update, remove } = require('../controller/moment.controller')

const momentRouter = new Router({prefix: '/moment'})

momentRouter.post('/create', verifyauth, create)
momentRouter.get('/detail/:momentID', detail)
momentRouter.get('/list', list)
momentRouter.patch('/:momentID', verifyauth, verifyMomentPermission, update)
momentRouter.delete('/:momentID', verifyauth, verifyMomentPermission, remove)

module.exports = momentRouter