const { Router } = require("express");
const router = Router();

const {loginUser} = require("../controllers/autentificacion.controlador");

router.route("/login").post(loginUser);

module.exports = router;
