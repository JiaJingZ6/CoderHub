const Router = require('koa-router')
const { avatarHandler, pictureHandler } = require('../middleware/file.middleware')
const { verifyauth, verifyMomentPermission } = require('../middleware/auth.middleware')
const { saveAvatarInfo, savePictureInfo } = require('../controller/file.controller')

const fileRouter = new Router({prefix: '/upload'})

fileRouter.post('/avatar', verifyauth, avatarHandler, saveAvatarInfo)
fileRouter.post('/:momentID/pictures', verifyauth, verifyMomentPermission, pictureHandler, savePictureInfo)

module.exports = fileRouter