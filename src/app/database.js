const mysql = require('mysql2')
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
} = require('./config')

// 创建连接池
const pool = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD
})

// 获取连接
pool.getConnection((err, conn) => {
  conn.connect(err => {
    if(err) console.log('数据库连接失败')
    else console.log('数据库连接成功')
  })
})

// 导出promise连接
module.exports = pool.promise()