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

module.exports = invCont