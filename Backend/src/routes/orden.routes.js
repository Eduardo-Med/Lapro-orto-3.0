const { Router } = require("express");
const router = Router();
const verifyToken = require('../middlewares/VerifyToken.middleware')

const {getOrden,getOrdenById,createOrden,updateOrden,deleteOrden,getOrdenesTerminadasById,addPrecio} = require("../controllers/orden.controlador");

router
  .route("/")
  .get(getOrden)
  .post(createOrden);

router
  .route("/:idOrden")
  .get(getOrdenById)
  .delete(verifyToken,deleteOrden);

router
  .route("/terminada/:idUsuario")
  .get(getOrdenesTerminadasById)

router
  .route("/:idOrden/:estado")
  .put(updateOrden);

router
.route("/cambiarPrecio/:idOrden/:precio")
  .put(addPrecio);
module.exports = router;
