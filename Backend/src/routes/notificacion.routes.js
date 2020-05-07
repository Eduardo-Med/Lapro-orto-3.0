const { Router } = require("express");
const router = Router();
const verifyToken = require('../middlewares/VerifyToken.middleware')
const {NotifiacionControlador} = require('../controllers/index');
const {getNotificacion,crearNotificacion,actualizarNotificacion} = new NotifiacionControlador();

router
  .route("/")
  .post(crearNotificacion);

router
  .route("/usuario/:idUsuario")
  .get(getNotificacion)

router
  .route("/:idNotificacion")
  .put(actualizarNotificacion);
module.exports = router;
