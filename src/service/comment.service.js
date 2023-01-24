const pool = require('../app/database')

class CommentService {
  async getCommentsByMomentID(momentID) {
    const statement = `
      SELECT
        m.id, m.content, m.comment_id commentId, m.createAt createTime,
        JSON_OBJECT('id', u.id, 'name', u.name)
      FROM comment m
      LEFT JOIN users u ON u.id = m.user_id
      WHERE moment_id = ?;`
    const result = await pool.execute(statement, [momentID])
    return result[0]
  }

  async getCommentById(commentID) {
    const statement = `
      SELECT
        c.id id, c.content content, c.createAt createTime, c.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) users,
        JSON_OBJECT('id', m.id, 'content', m.content) moment
      FROM comment c
      LEFT JOIN users u ON c.user_id = u.id
      LEFT JOIN moment m ON c.moment_id = m.id
      WHERE c.id = ?;
    `
    const result = await pool.execute(statement, [commentID])
    return result[0]
  }

  async create(comment, momentID, userID) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`
    const result = await pool.execute(statement, [comment, momentID, userID])
    return result[0]
  }

  async relpy(content, momentID, userID, commentID) {
    const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?);`
    const result = await pool.execute(statement, [content, momentID, userID, commentID])
    return result[0]
  }

  async update(content, commentID) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`
    const result = await pool.execute(statement, [content, commentID])
    return result[0]
  }

  async remove(commentID) {
    const statement = `DELETE FROM comment WHERE id = ?;`
    const result = await pool.execute(statement, [commentID])
    return result[0]
  }
}

module.exports = new CommentService()