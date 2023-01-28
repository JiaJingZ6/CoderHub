const service = require('../service/label.service')

const filterLabels = async (ctx, next) => {
  // 1.取出所有标签
  const { labels } = ctx.request.body
  const newLabels = new Array()
  for(const label of labels) {
    const {exist, result} = await service.isLabelExist(label)
    if(exist) {
      newLabels.push({
        label,
        id: result[0]?.id
      })
    } else {
      const createResult = await service.create(label)
      newLabels.push({
        label,
        id: createResult.insertId
      })
    }
  }
  ctx.newLabels = newLabels
  await next()
}

module.exports = {
  filterLabels
}