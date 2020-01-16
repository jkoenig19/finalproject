const router = require("express").Router();
const customersController = require("../../controllers/customersController");

router.route("/")
  .get(customersController.findAll)
  .post(customersController.create);

router
  .route("/:id")
  .get(customersController.findById)
  .put(customersController.update)
  .delete(customersController.remove);

module.exports = router;
