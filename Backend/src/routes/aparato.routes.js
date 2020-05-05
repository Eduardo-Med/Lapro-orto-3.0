const { Router } = require("express");
const router = Router();
const {AparatoControlador} = require('../controllers/index');
const {getAparatos,createAparato,updateAparato,deleteAparato} = new AparatoControlador();

router
  .route("/")
  .get(getAparatos)
  .post(createAparato)


router
  .route("/:idAparato")
  .put(updateAparato)
  .delete(deleteAparato);
module.exports = router;