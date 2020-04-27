const { Router } = require("express");
const router = Router();
const verifyToken = require('../middlewares/verifyToken.middleware')

const {getOrden,getOrdenById,createOrden,updateOrden,deleteOrden,getOrdenTerminadaById,addPrecio} = require("../controllers/orden.controlador");

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
  .get(getOrdenTerminadaById)

router
  .route("/:idOrden/:estado")
  .put(updateOrden);

router
.route("/cambiarPrecio/:idOrden/:precio")
  .put(addPrecio);
module.exports = router;
