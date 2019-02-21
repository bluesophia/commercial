const path = require('path');
const express = require('express');
const { body } = require('express-validator/check')  
const adminController = require("../controllers/admin");
const isAuth = require('../middleware/js-auth')
const router = express.Router();

// admin/add-product => GET
router.get("/add-product", isAuth.isAuth , adminController.getAddProduct);

router.get("/products", isAuth.isAuth , adminController.getProducts);

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
    isAuth.isAuth, 
    adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth.isAuth, adminController.getEditProduct);

router.post("/edit-product", isAuth.isAuth, adminController.postEditProduct);

router.post("/delete-product", isAuth.isAuth, adminController.postDeleteProduct);


module.exports = router;