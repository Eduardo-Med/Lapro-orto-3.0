const { Router } = require("express");
const router = Router();
const {createVenta,getVentas} = require('../controllers/venta.controlador');

router
  .route("/")
  .get(getVentas)
  .post(createVenta)
module.exports = router;