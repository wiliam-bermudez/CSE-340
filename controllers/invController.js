const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    const nav = await utilities.getNav()
    const className = data[0].classification_name

    res.render("./inventory/classification", {
      title: className + " vehicles",
      nav,
      grid
    })
  } catch (error) {
    next(error)
  }
}

invCont.buildByInventoryId = async function (req, res, next) {
  try {
    const inv_id = req.params.inv_id
    const data = await invModel.getInventoryById(inv_id)
    const nav = await utilities.getNav()

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
  } catch (error) {
    next(error)
  }
}

invCont.buildManagement = async function (req, res, next) {
  try {
    const nav = await utilities.getNav()
    res.render("inventory/management", {
      title: "Inventory Management",
      nav
    })
  } catch (error) {
    next(error)
  }
}

invCont.buildAddClassification = async function (req, res) {
  try {
    const nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
      classification_name: ""
    })
  } catch (error) {
    console.error(error)
  }
}

invCont.addClassification = async function (req, res) {
  try {
    const nav = await utilities.getNav()
    const { classification_name } = req.body
    const result = await invModel.addClassification(classification_name)

    if (result) {
      req.flash("notice", "Classification added successfully.")
      return res.redirect("/inv")
    } else {
      req.flash("notice", "Sorry, the insert failed.")
      return res.render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        classification_name,
        errors: null
      })
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

invCont.buildAddInventory = async function (req, res) {
  try {
    const nav = await utilities.getNav()
    const classificationList = await utilities.buildClassificationList()

    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      errors: null,
      inv_make: "",
      inv_model: "",
      inv_year: "",
      inv_description: "",
      inv_image: "",
      inv_thumbnail: "",
      inv_price: "",
      inv_miles: "",
      inv_color: ""
    })
  } catch (error) {
    console.error(error)
  }
}
invCont.addInventory = async function (req, res) {
  try {
    const nav = await utilities.getNav()
    const result = await invModel.addInventory(req.body)

    if (result) {
      req.flash("notice", "Vehicle added successfully.")
      return res.redirect("/inv")
    } else {
      req.flash("notice", "Failed to add vehicle.")
      const classificationList = await utilities.buildClassificationList(req.body.classification_id)

      return res.render("inventory/add-inventory", {
        title: "Add Inventory",
        nav,
        classificationList,
        errors: null,
        ...req.body
      })
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = invCont