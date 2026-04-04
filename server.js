/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()

const app = express()

const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const utilities = require("./utilities/index")
const accountRoute = require("./routes/accountRoute")

const session = require("express-session")
const pool = require('./database/')
const pgSession = require('connect-pg-simple')(session)

/* ***********************
 * Middleware
 *************************/

// Static files (FIXED)
app.use(express.static("public"))

// Body parsing (MODERN WAY)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session setup
app.use(session({
  store: new pgSession({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))

// Flash messages
app.use(require('connect-flash')())

// Express Messages Middleware (COURSE REQUIRED)
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ***********************
 * Routes
 *************************/

// Static routes
app.use(static)

// Inventory routes
app.use("/inv", inventoryRoute)

// Account routes
app.use("/account", accountRoute)

// Home route
app.get("/", utilities.handleErrors(baseController.buildHome))

/* ***********************
 * Error Handling
 *************************/

// 404 handler
app.use(async (req, res, next) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' })
})

// General error handler
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)

  let message
  if (err.status == 404) {
    message = err.message
  } else {
    message = 'Oh no! There was a crash. Maybe try a different route?'
  }

  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})

/* ***********************
 * Server Info
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Start Server
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})