// Needed resources
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")

// Route for account home
router.get(
  "/",
  utilities.handleErrors(accountController.buildAccountView)
)

//Login view route
router.get(
  "/login",
  utilities.handleErrors(accountController.buildLogin)
)

// Route for Register view
router.get(
    "/register",
    utilities.handleErrors(accountController.buildRegister)
)

router.post('/register', utilities.handleErrors(accountController.registerAccount))


// Export the router
module.exports = router