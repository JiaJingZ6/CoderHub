const pool = require('../app/database')

class CommentService {
  async create(comment, momentID, userID) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`
    const result = await pool.execute(statement, [comment, momentID, userID])
    return result[0]
  }
}

module.exports = new CommentService()