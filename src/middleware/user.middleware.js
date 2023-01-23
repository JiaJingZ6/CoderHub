const jwt = require('jsonwebtoken')
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_ALREADY_EXIST,
  USER_IS_NOT_EXIST,
  PASSWORD_ERROR,
  UNAUTHORIZATION
} = require('../constants/error-types')

const { getUserByName } = require('../service/user.service')
const md5password = require('../utils/md5password')
const { PUBLIC_KEY } = require('../app/config')

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

const verifylogin = async (ctx, next) => {
  const {name, password} = ctx.request.body

  // 1.判断用户名或密码是否为空
  if(!name || !password) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 2.判断用户名是否存在
  const result = await getUserByName(name)
  if(!result.length) {
    const error = new Error(USER_IS_NOT_EXIST)
    return ctx.app.emit('error', error, ctx)
  }

  // 3.判断密码是否正确
  if(result[0].password !== password) {
    const error = new Error(PASSWORD_ERROR)
    return ctx.app.emit('error', error, ctx)
  }
  ctx.user = result[0]

  await next()
}

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
    console.log(result)
    await next()
  } catch {
    const error = new Error(UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
}

module.exports = {
  verifyuser,
  handlePassword,
  verifylogin,
  verifyauth
}