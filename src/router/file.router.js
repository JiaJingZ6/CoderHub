const Router = require('koa-router')
const { avatarHandler } = require('../middleware/file.middleware')
const { verifyauth } = require('../middleware/auth.middleware')
const { saveAvatarInfo } = require('../controller/file.controller')

const fileRouter = new Router({prefix: '/upload'})

fileRouter.post('/avatar', verifyauth, avatarHandler, saveAvatarInfo)

module.exports = fileRouter