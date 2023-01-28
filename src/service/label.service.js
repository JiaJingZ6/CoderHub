const pool = require('../app/database')

class LabelService {
  async create(label) {
    const statement = `INSERT INTO label (name) VALUES (?);`
    const result = await pool.execute(statement, [label])
    return result[0]
  }
}

module.exports = new LabelService()