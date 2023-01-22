const {
  USER_ALREADY_EXIST,
  NAME_OR_PASSWORD_IS_REQUIRED
} = require('../constants/error-types')

const errorHandler = (error, ctx) => {
  let status, body
  switch(error.message) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400 // Bad Request
      body = '用户名或者密码不能为空'
      break
    case USER_ALREADY_EXIST:
      status = 409 // Conflict
      body = '用户名已存在'
      break
    default:
      status = 404
      body = 'NOT FOUND'
  }
  ctx.status = status
  ctx.body = body
}

module.exports = errorHandler