const Product = require("../models/product");
const Sequelize = require("sequelize");

 exports.getIndex = (req, res, next) => {
    console.log("getIndex start");

    Product.findAll()
        .then(products => {
            console.log("getIndex");
            res.render("shop/index", {
                prods: products,
                pageTitle: "Shop",
                path: "/"
            });
        })
        .catch(err => console.log(err));
}