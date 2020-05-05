const { Router } = require("express");
const router = Router();
const {VentaControlador} = require('../controllers/index');
const {createVenta,getVentas} = new VentaControlador();

router
  .route("/")
  .get(getVentas)
  .post(createVenta)
module.exports = router;