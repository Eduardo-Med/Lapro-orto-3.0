const { Router } = require("express");
const router = Router();
const {TicketControlador} = require('../controllers/index');
const {crearPDF, getFile} = new TicketControlador();

router
  .route("/")
  .get(crearPDF)

module.exports = router; 