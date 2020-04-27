const { Router } = require("express");
const router = Router();
const {getAparatos,createAparato,updateAparato,deleteAparato} = require('../controllers/aparato.controlador');

router
  .route("/")
  .get(getAparatos)
  .post(createAparato)


router
  .route("/:idAparato")
  .put(updateAparato)
  .delete(deleteAparato);
module.exports = router;