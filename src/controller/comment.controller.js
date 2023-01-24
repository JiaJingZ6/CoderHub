const service = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    const { momentID ,content } = ctx.request.body
    const { id } = ctx.user
    console.log(id)
    const result = await service.create(content, momentID, id)
    ctx.body = result
    // ctx.body = '发表评论成功'
  }
}

module.exports = new CommentController()