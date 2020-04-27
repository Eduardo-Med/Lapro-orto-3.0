const { Router } = require("express");
const router = Router();

const {crearPDF, getFile} = require("../controllers/ticket.controlador");

router
  .route("/")
  .get(crearPDF)

module.exports = router; 