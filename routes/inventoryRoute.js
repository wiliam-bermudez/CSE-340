const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")


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

// Management view route
router.get(
  "/",
  utilities.handleErrors(invController.buildManagement)
)

// Add Classification View Route 
// Show form
router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildAddClassification)
)

// Process form
router.post(
  "/add-classification",
  validate.classificationRules(),
  validate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)


// Add Inventory View Route (placeholder)
router.get(
  "/add-inventory",
  (req, res) => {
    res.send("Add Inventory View Coming Soon")
  }
)





module.exports = router