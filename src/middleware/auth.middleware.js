const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../app/config')
const { UNAUTHORIZATION, UNPERMISSION } = require('../constants/error-types')
const { getMomentById } = require('../service/moment.service')

const verifyauth = async (ctx, next) => {
  const authorization = ctx.header.authorization
  // 判断有没有传递token，没有传递也是未授权
  if(!authorization) {
    const error = new Error(UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }

  const token = authorization.split(' ')[1]
  try {
    // 使用公钥进行解密
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result
    await next()
  } catch {
    console.log("??")
    const error = new Error(UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
}

const verifyPermission = async (ctx, next) => {
  const { id } = ctx.user
  const { momentID } = ctx.params
  const [ { users } ] = await getMomentById(momentID)
  if(id !== users.id) {
    const error = new Error(UNPERMISSION)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

module.exports = {
  verifyauth,
  verifyPermission
}