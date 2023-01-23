const service = require('../service/user.service')

class UserController {
  async register(ctx, next) {
    const user = ctx.request.body
    const result = await service.register(user)
    ctx.body = result
  }

  async login(ctx, next) {
    const { name } = ctx.request.body
    ctx.body = `登录成功，欢迎${name}回来！`
  }
}

module.exports = new UserController()