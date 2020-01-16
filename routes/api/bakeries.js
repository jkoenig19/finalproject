const router = require("express").Router();
const bakeriesController = require("../../controllers/bakeriesController");

router.route("/")
  .get(bakeriesController.findAll)
  .post(bakeriesController.create);

router
  .route("/:id")
  .get(bakeriesController.findById)
  .put(bakeriesController.update)
  .delete(bakeriesController.remove);

module.exports = router;
