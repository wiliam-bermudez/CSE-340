const pool = require('../database/')

async function registerAccount(firstName, lastName, email, password) {
  try {
    const sql = 'INSERT INTO accounts (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)'
    const result = await pool.query(sql, [firstName, lastName, email, password])
    return result.rowCount > 0
  } catch (error) {
    console.error('Model error:', error)
    return false
  }
}

module.exports = { registerAccount }