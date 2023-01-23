const pool = require('../app/database')

class MomentService {
  async create(user) {
    const { content, id } = user
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`
    const result = await pool.execute(statement, [content, id])
    return result[0]
  }

  async getMomentById(id) {
    const statement = `
      SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) users
      FROM moment m
      LEFT JOIN users u ON m.user_id = u.id
      WHERE m.id = ?;
    `
    const result = await pool.execute(statement, [id])
    return result[0]
  }

  async getMomentList({offset, size}) {
    const statement = `
      SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) users
      FROM moment m
      LEFT JOIN users u ON m.user_id = u.id
      LIMIT ?, ?;
    `
    const result = await pool.execute(statement, [offset, size])
    return result[0]
  }

  async update(content, momentID) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`
    const result = await pool.execute(statement, [content, momentID])
    return result[0]
  }
  
  async remove(momentID) {
    const statement = `DELETE FROM moment WHERE id = ?;`
    const result = await pool.execute(statement, [momentID])
    return result[0]
  }
}

module.exports = new MomentService()