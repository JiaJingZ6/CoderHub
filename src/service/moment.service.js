const pool = require('../app/database')

class MomentService {
  async create(user) {
    const { content, id } = user
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`
    const result = await pool.execute(statement, [content, id])
    return result[0]
  }
}

module.exports = new MomentService()