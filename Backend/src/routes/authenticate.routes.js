const { Router } = require("express");
const router = Router();
const {AutentificacionControlador} = require('../controllers/index');


const {loginUser} = new AutentificacionControlador

router.route("/login").post(loginUser);

module.exports = router;
