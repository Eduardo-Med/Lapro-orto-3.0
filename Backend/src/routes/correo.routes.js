const { Router } = require("express");
const router = Router();
const {CorreoControlador} = require('../controllers/index');
const {enviarCorreo,correoConfirmacion} = new CorreoControlador();

router
  .route("/")
  .post(enviarCorreo);

router
  .route("/registro")
  .post(correoConfirmacion);

module.exports = router;