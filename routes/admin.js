const path = require('path');
const express = require('express');
const { body } = require('express-validator')  
const adminController = require("../controllers/admin");
const router = express.Router();

// admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

router.get("/products", isAuth, adminController.getProducts);

// admin/add-product => POST
router.post(
    "/add-product", 
    [
        body("title")
            .isString()
            .isLength({ min : 3 })
            .trim(),
        body("imageUrl")
            .isURL(),
        body("price")
            .isFloat()
            .isLength({ min : 2 })
            .trim(),
        body("description")
            .isLength({ min: 5, max: 400 })
            .trim()
    ],
    isAuth, 
    adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post("/edit-product", isAuth, adminController.postEditProduct);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);


module.exports = router;