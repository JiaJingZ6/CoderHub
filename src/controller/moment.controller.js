const service = require('../service/moment.service')

class MomentController {
  async create(ctx, next) {
    const { id } = ctx.user
    const { content } = ctx.request.body
    const result = await service.create({content, id})
    console.log(result)
    ctx.body = result
  }

  async detail(ctx, next) {
    const { momentID } = ctx.params
    const result = await service.getMomentById(momentID)
    ctx.body = result
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query
    const result = await service.getMomentList({offset, size})
    ctx.body = result
  }
}

module.exports = new MomentController()