const fs = require('fs')
const useRouter = app => {
  fs.readdirSync(__dirname).forEach(fileName => {
    if(fileName === 'index.js') return
    const router = require(`./${fileName}`)
    app.use(router.routes()).use(router.allowedMethods())
  })
}

module.exports = useRouter