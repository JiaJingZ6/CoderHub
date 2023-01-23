const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_ALREADY_EXIST
} = require('../constants/error-types')

const { getUserByName } = require('../service/user.service')
const md5password = require('../utils/md5password')

const verifyuser = async (ctx, next) => {
  const { name, password } = ctx.request.body

  if(!name || !password) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  const result = await getUserByName(name)
  if(result.length) {
    const error = new Error(USER_ALREADY_EXIST)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body
  ctx.request.body.password = md5password(password)

  await next()
}

module.exports = {
  verifyuser,
  handlePassword
}