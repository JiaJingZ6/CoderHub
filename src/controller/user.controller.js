const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')
const service = require('../service/user.service')

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
}

module.exports = new UserController()