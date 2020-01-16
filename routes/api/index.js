const router = require("express").Router();
const bakeriesRoutes = require("./bakeries");
const customersRoutes = require("./customers");
const inventoriesRoutes = require("./inventories");
const ordersRoutes = require("./orders");

router.use("/bakeries", bakeriesRoutes);
router.use("/customers", customersRoutes);
router.use("/inventories", inventoriesRoutes);
router.use("/orders", ordersRoutes);

module.exports = router;
