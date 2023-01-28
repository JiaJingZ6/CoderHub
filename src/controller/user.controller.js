const jwt = require('jsonwebtoken')
const fs = require('fs')
const { PRIVATE_KEY } = require('../app/config')
const { AVATAR_PATH } = require('../constants/file-path')
const service = require('../service/user.service')
const { getAvatarByUserId } = require('../service/file.service')

class UserController {
  async register(ctx, next) {
    const user = ctx.request.body
    const result = await service.register(user)
    ctx.body = result
  }

  async login(ctx, next) {
    const { id, name } = ctx.user
    const token = jwt.sign({id, name}, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: 'RS256'
    })
    ctx.body = { id, name, token }
  }

  async auth(ctx, next) {
    ctx.body = '验证通过'
  }

  async getAvatarInfo(ctx, next) {
    const { userID } = ctx.params
    const result = await getAvatarByUserId(userID)
    ctx.response.set('content-type', result.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}`)
  }
}

module.exports = new UserController()