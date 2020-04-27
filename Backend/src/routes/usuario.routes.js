const { Router } = require("express");
const router = Router();
const {createUsuario,getUsuarios,updateUsuario,deleteUsuario, getUsuarioByEmail} = require('../controllers/usuario.controlador');
const verifyToken = require('../middlewares/verifyToken.middleware')

router
  .route("/")
  .get(getUsuarios)
  .post(createUsuario)

router
  .route("/:id")
  .get(verifyToken,getUsuarioByEmail)
  .put(verifyToken,updateUsuario)
  .delete(verifyToken,deleteUsuario);
module.exports = router;
