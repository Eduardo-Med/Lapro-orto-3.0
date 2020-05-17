const { Router } = require("express");
const router = Router();
const {UsuarioControlador} = require('../controllers/index');
const verifyToken = require('../middlewares/VerifyToken.middleware')

const {createUsuario,getUsuarios,updateUsuario,deleteUsuario, getUsuarioByEmail,cambiarContrasena} = new UsuarioControlador();
router
  .route("/")
  .get(getUsuarios)
  .post(createUsuario)

router
  .route("/:idUsuario")
  .get(verifyToken,getUsuarioByEmail)
  .put(verifyToken,updateUsuario)
  .delete(verifyToken,deleteUsuario);

router
  .route("/contrasena/:idUsuario")
  .put(cambiarContrasena)


module.exports = router;
