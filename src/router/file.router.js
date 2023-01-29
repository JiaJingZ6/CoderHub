const Router = require('koa-router')
const { avatarHandler, pictureHandler, pictureResize } = require('../middleware/file.middleware')
const { verifyauth, verifyMomentPermission } = require('../middleware/auth.middleware')
const { saveAvatarInfo, savePictureInfo } = require('../controller/file.controller')

const fileRouter = new Router({prefix: '/upload'})

fileRouter.post('/avatar', verifyauth, avatarHandler, saveAvatarInfo)
fileRouter.post('/:momentID/pictures', verifyauth, verifyMomentPermission, pictureHandler, pictureResize, savePictureInfo)

module.exports = fileRouter