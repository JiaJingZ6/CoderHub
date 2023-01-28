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
        JSON_OBJECT('id', u.id, 'name', u.name) users,
        JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
                                  'user', JSON_OBJECT('id', cu.id, 'name', cu.name))) comments
      FROM moment m
      LEFT JOIN users u ON m.user_id = u.id
      LEFT JOIN comment c ON c.moment_id = m.id
      LEFT JOIN users cu ON c.user_id = cu.id
      WHERE m.id = ${id};
    `
    const result = await pool.execute(statement)
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

  async addLabels(momentID, labelID) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`
    const result = await pool.execute(statement, [momentID, labelID])
    return result[0]
  }

  async hasLabel(momentID, labelID) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? and label_id = ?;`
    const result = await pool.execute(statement, [momentID, labelID])
    return result[0].length > 0
  }
}

module.exports = new MomentService()