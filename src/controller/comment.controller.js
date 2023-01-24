const service = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    const { momentID ,content } = ctx.request.body
    const { id } = ctx.user
    const result = await service.create(content, momentID, id)
    ctx.body = result
  }

  async reply(ctx, next) {
    const { momentID, content} = ctx.request.body
    const { commentID } = ctx.params
    const { id } = ctx.user
    const result = await service.relpy(content, momentID, id, commentID)
    ctx.body = result
  }

  async update(ctx, next) {
    const { content } = ctx.request.body
    const { commentID } = ctx.params
    const result = await service.update(content, commentID)
    ctx.body = result
  }

  async remove(ctx, next) {
    const { commentID } = ctx.params
    const result = await service.remove(commentID)
    ctx.body = result
  }
}

module.exports = new CommentController()