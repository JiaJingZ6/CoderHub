const service = require('../service/user.service')

class UserController {
  async register(ctx, next) {
    const user = ctx.request.body
    const result = await service.register(user)
    ctx.body = result
  }
}

module.exports = new UserController()