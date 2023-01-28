const pool = require('../app/database')

class LabelService {
  async create(label) {
    const statement = `INSERT INTO label (name) VALUES (?);`
    const result = await pool.execute(statement, [label])
    return result[0]
  }

  async isLabelExist(label) {
    const statement = `SELECT * FROM label WHERE name = ?;`
    const [result] = await pool.execute(statement, [label])
    return {
      exist: result.length > 0,
      result
    }
  }

  async getLabelList(offset, size) {
    const statement = `SELECT * FROM label LIMIT ?, ?;`
    const [result] = await pool.execute(statement, [offset, size])
    return result
  }
}

module.exports = new LabelService()