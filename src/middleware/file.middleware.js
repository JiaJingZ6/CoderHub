const Multer = require('koa-multer')
const jimp = require('jimp')
const path = require('path')
const { AVATAR_PATH, PICTURE_PATH } = require('../constants/file-path')

const avatarUpload = Multer({
  dest: AVATAR_PATH
})

const pictureUpload = Multer({
  dest: PICTURE_PATH
})

const avatarHandler = avatarUpload.single('avatar')
const pictureHandler = pictureUpload.array('picture', 9)

const pictureResize = async (ctx, next) => {
  const files = ctx.req.files
  for(const file of files) {
    const destPath = path.join(file.destination, file.filename)
    jimp.read(file.path).then(image => {
      image.resize(80, jimp.AUTO).writeAsync(`${destPath}-large`)
    })
  }
  await next()
}

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize
}