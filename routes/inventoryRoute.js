const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const validate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
)

// Route to build vehicle detail view
router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildByInventoryId)
)

// Management view route (Task 1)
router.get(
  "/",
  utilities.handleErrors(invController.buildManagement)
)

// Add Classification View Route (Task 2)
// Show form
router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildAddClassification)
)

// Process Add Classification form
router.post(
  "/add-classification",
  validate.classificationRules(),
  validate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Add Inventory View Route (Task 3)
// Show form
router.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildAddInventory)
)

// Process Add Inventory form
router.post(
  "/add-inventory",
  utilities.handleErrors(invController.addInventory)
)

module.exports = router