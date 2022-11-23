const express = require("express");
const controllers = require("../controllers/clients");
const router = express.Router();

/* ====================================================
                    HOME
==================================================== */ 

router.route("/users").get(controllers.listClients);
router.route("/user/:ni").get(controllers.niClient);
router.route("/user").post(controllers.addClient);
router.route("/user").put(controllers.updateClient);
router.route("/user").delete(controllers.deleteClient)



module.exports = router;