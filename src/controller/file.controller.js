const service = require('../service/file.service')

class FileController {
  async saveAvatarInfo(ctx, next) {
    // 1.获取图像相关信息
    const { filename, mimetype, size } = ctx.req.file
    const { id } = ctx.user
    const result = await service.createAvatar(filename, mimetype, size, id)
    ctx.body = result
  }
}

module.exports = new FileController()