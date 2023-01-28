const pool = require('../app/database')

class FileService {
  async createAvatar(filename, mimetype, size, userID) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`
    const result = await pool.execute(statement, [filename, mimetype, size, userID])
    return result[0]
  }
}

module.exports = new FileService()