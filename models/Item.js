const db = require('../config/db');

class Item {
  static async getAll(userId) {
    const [rows] = await db.promise().query('SELECT * FROM items WHERE user_id = ?', [userId]);
    return rows;
  }

  static async getById(id, userId) {
    const [rows] = await db.promise().query('SELECT * FROM items WHERE id = ? AND user_id = ?', [id, userId]);
    return rows[0];
  }

  static async create({ name, description, user_id }) {
    const [result] = await db.promise().query(
      'INSERT INTO items (name, description, user_id) VALUES (?, ?, ?)',
      [name, description, user_id]
    );
    return result.insertId;
  }

  static async update(id, { name, description }, userId) {
    await db.promise().query(
      'UPDATE items SET name = ?, description = ? WHERE id = ? AND user_id = ?',
      [name, description, id, userId]
    );
  }

  static async delete(id, userId) {
    await db.promise().query('DELETE FROM items WHERE id = ? AND user_id = ?', [id, userId]);
  }
}

module.exports = Item;