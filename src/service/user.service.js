const pool = require('../app/database')

class UserService {
  async register(user) {
    const { name, password } = user
    const statement = `INSERT INTO users (name, password) VALUES (?, ?);`
    const result = await pool.execute(statement, [name, password])
    return result
  }
}

module.exports = new UserService()