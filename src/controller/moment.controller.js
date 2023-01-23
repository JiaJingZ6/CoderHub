const service = require('../service/moment.service')

class MomentController {
  async create(ctx, next) {
    const { id } = ctx.user
    const { content } = ctx.request.body
    const result = await service.create({content, id})
    console.log(result)
    ctx.body = result
  }
}

module.exports = new MomentController()