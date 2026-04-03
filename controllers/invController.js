const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.inv_id

  const data = await invModel.getInventoryById(inv_id)

  let nav = await utilities.getNav()

  if (!data) {
    return res.status(404).render("errors/error", {
      title: "Vehicle Not Found",
      nav,
      message: "Sorry, no vehicle found."
    })
  }

  const vehicleHTML = await utilities.buildVehicleDetail(data)

  const title = `${data.inv_make} ${data.inv_model}`

  res.render("inventory/details", {
    title,
    nav,
    vehicleHTML
  })
}

/* ***************************
 *  Build vehicle detail view
 * ************************** */


    // Build Management View
    invCont.buildManagement = async function (req, res, next) {
      let nav = await utilities.getNav()
      res.render("inventory/management", {
        title: "Inventory Management",
        nav,
        messages: req.flash("notice")
      })
    }


    // Build Add Classification view
  invCont.buildAddClassification = async function (req, res) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
      classification_name: "",
      messages: req.flash("notice")
    })
  }

  // Process form
  invCont.addClassification = async function (req, res) {
    let nav = await utilities.getNav()
    const { classification_name } = req.body

    const result = await invModel.addClassification(classification_name)

    if (result) {
      req.flash("notice", "Classification added successfully.")

      // rebuild nav to include new classification
      nav = await utilities.getNav()

      return res.render("inventory/management", {
        title: "Inventory Management",
        nav,
        messages: req.flash("notice")
      })
    } else {
      req.flash("notice", "Sorry, the insert failed.")

      return res.render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        classification_name,
        errors: null,
        messages: req.flash("notice")
      })
    }
  }


module.exports = invCont
