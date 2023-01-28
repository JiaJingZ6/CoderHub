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

  async update(ctx, next) {
    const { momentID } = ctx.params
    const { content } = ctx.request.body
    const result = await service.update(content, momentID)
    ctx.body = result
  }

  async remove(ctx, next) {
    const { momentID } = ctx.params
    const result = await service.remove(momentID)
    ctx.body = result
  }

  async addLabel(ctx, next) {
    const { newLabels } = ctx
    const { momentID } = ctx.params
    for(const label of newLabels) {
      const hasLabel = await service.hasLabel(momentID, label.id)
      if(!hasLabel) {
        await service.addLabels(momentID, label.id)
      }
    }
    ctx.body = '添加成功'
  }
}

module.exports = new MomentController()