const service = require('../service/file.service')
const { updateAvatarById } = require('../service/user.service')
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

  async savePictureInfo(ctx, next) {
    // 1.获取图像信息
    const files = ctx.req.files
    const { id } = ctx.user
    const { momentID } = ctx.params
    console.log(momentID)
    
    // 2.将所有的文件信息保存到数据库
    for(const file of files) {
      const { filename, mimetype, size } = file
      await service.createPicture(filename, mimetype, size, momentID, id)
    }

    ctx.body = '上传成功'
  }
}

module.exports = new FileController()