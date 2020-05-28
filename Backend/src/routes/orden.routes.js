const { Router } = require("express");
const router = Router();
const verifyToken = require('../middlewares/VerifyToken.middleware')
const {OrdenControlador} = require('../controllers/index');
const {getOrden,getOrdenById,createOrden,cambiarEstado,deleteOrden,getOrdenesTerminadasById,addPrecio} = new OrdenControlador();

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
  .put(cambiarEstado);

router
.route("/cambiarPrecio/:idOrden/:precio")
  .put(addPrecio);
module.exports = router;
