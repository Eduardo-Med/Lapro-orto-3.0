const { Router } = require("express");
const router = Router();

const {enviarCorreo} = require("../controllers/sendemail.controlador");

router
  .route("/")
  .post(enviarCorreo);

module.exports = router;