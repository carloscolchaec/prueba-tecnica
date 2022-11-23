const express = require("express");
const controllers = require("../controllers/orders");
const router = express.Router();

/* ====================================================
                    HOME
==================================================== */ 

router.route("/orders").get(controllers.listOrders);
router.route("/order").post(controllers.addOrders);
router.route("/order").delete(controllers.deleteOrders);

module.exports = router;