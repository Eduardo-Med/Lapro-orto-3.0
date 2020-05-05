const { Router } = require("express");
const router = Router();
const {SendEmail} = require('../controllers/index');
const {enviarCorreo} = new SendEmail();

router
  .route("/")
  .post(enviarCorreo);

module.exports = router;