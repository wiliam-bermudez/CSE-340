// Needed resources
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')



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

// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.buildRegister)
)


// Process the login attempt
router.post(
  "/login",
  (req, res) => {
    res.status(200).send('login process')
  }
)


// Export the router
module.exports = router