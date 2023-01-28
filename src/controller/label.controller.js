const service = require('../service/label.service')
class LabelController {
  async create(ctx, next) {
    const { label } = ctx.request.body
    const result = await service.create(label)
    ctx.body = result
  }
}

module.exports = new LabelController()