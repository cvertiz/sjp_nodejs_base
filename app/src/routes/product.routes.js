const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controllers");

// Llamar a la función "saludar"
//router.get('/:nombre', ProductController.saludar);
//router.get('/', ProductController.saludar);
router.get("/clients/find", ProductController.findAllClients);

router.get("/products/find", ProductController.findAll);
router.post("/products/create", ProductController.create);
router.post("/products/update", ProductController.update);
router.post("/products/delete", ProductController.delete);
router.post("/products/seach_by_name", ProductController.seach_by_name);
router.post("/products/seach_by_id", ProductController.seach_by_id);

module.exports = router;
