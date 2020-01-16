const router = require("express").Router();
const inventoriesController = require("../../controllers/inventoriesController");

router.route("/")
  .get(inventoriesController.findAll)
  .post(inventoriesController.create);

router
  .route("/:id")
  .get(inventoriesController.findById)
  .put(inventoriesController.update)
  .delete(inventoriesController.remove);

module.exports = router;
