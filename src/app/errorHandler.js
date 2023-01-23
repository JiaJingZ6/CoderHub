const {
  USER_ALREADY_EXIST,
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_IS_NOT_EXIST,
  PASSWORD_ERROR
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
    case USER_IS_NOT_EXIST:
      status = 400
      body = '用户名不存在'
      break
    case PASSWORD_ERROR:
      status = 400
      body = '密码不正确'
      break
    default:
      status = 404
      body = 'NOT FOUND'
  }
  ctx.status = status
  ctx.body = body
}

module.exports = errorHandler