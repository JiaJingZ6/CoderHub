const pool = require('../app/database')

class UserService {
  async register(user) {
    const { name, password } = user
    const statement = `INSERT INTO users (name, password) VALUES (?, ?);`
    const result = await pool.execute(statement, [name, password])
    return result[0]
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`
    const result = await pool.execute(statement, [name])
    return result[0]
  }

  async updateAvatarById(userID, avatarUrl) {
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`
    const result = await pool.execute(statement, [avatarUrl, userID])
    return result[0]
  }
}

module.exports = new UserService()