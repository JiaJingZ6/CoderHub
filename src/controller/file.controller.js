const service = require('../service/file.service')
const { updateAvatarById } = require('../service/user.service')
const { AVATAR_PATH } = require('../constants/file-path')
const { APP_HOST, APP_PORT } = require('../app/config')

class FileController {
  async saveAvatarInfo(ctx, next) {
    // 1.获取图像相关信息
    const { filename, mimetype, size } = ctx.req.file
    const { id } = ctx.user
    const result = await service.createAvatar(filename, mimetype, size, id)
    
    const avatarUrl = `http://${APP_HOST}:${APP_PORT}/user/${id}/avatar`
    await updateAvatarById(id, avatarUrl)
    ctx.body = result
  }
}

module.exports = new FileController()