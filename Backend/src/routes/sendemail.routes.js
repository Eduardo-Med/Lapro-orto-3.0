const { Router } = require("express");
const router = Router();
const {SendEmail} = require('../controllers/index');
const {enviarCorreo,correoConfirmacion} = new SendEmail();

router
  .route("/")
  .post(enviarCorreo);

router
  .route("/registro")
  .post(correoConfirmacion);

module.exports = router;