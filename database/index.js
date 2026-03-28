const { Pool } = require("pg")
require("dotenv").config()

let pool

if (process.env.NODE_ENV === "production") {
  //  Render (producción)
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  })
} else {
  //  Local (development)
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
}

// Logging opcional (te ayuda mucho)
module.exports = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params)
      console.log("executed query", { text })
      return res
    } catch (error) {
      console.error("error in query", { text })
      throw error
    }
  },
}