const Product = require("../models/product");
// const mongoose = require('mongoose');

/*********************************************
    postAddProduct(데이터 추가하기)-mongoose
**********************************************/

exports.postAddProduct = (req, res, next) => {
    // 1. 추가할 데이터를 form에서 가져온다.
    const { title, imageUrl, description, price } = req. body;
    // 2. 데이터가 잘 들어왔는지 확인한다.
    console.log(req.body);
    // 3. 확인된 데이터를 새로운 오브젝트에 담아 인스턴스화 시킨다.
    const Product = new Product({
        title:title,
        imageUrl: imageUrl,
        description: description,
        price: price
    })
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).render("admin/edit-product", {
            pageTitle: "Add Product",
            path: "/admin/edit-product",
            editing: false,
            hasError: true,
            product: {
                title,
                imageUrl,
                price,
                description
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        })
    }

    const product = new Product({
        title: title,
        price: price,
        description: descripton,
        imageUrl: imageUrl,
        userId: req.user
    })
    product
        .save()
        .then(result => {
            console.log("Created Product");
            res.redirect("/admin/products");
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        }) 
}


/*********************************************
        getAddProduct(추가한 데이터 가져오기)
**********************************************/

exports.getAddProduct = (req, res, next) => {
    // 1. 추가할 폼을 렌더시킨다.("admin/add-product"(라우터)=>path:"보여질 view경로")
    res.render("admin/add-product",{
        pageTitle: "Add Product",
        path: "admin/add-product",
        formCSS: true,
        productCss: true,
        activeAddProduct: true,
        editing: false,
        hasError: false,
        errorMessage: null,
        validationErrors: []
    })
}


/*********************************************
  getProducts(추가한 데이터 all product에 가져오기)
**********************************************/

exports.getProducts = (req, res, next) => {
    producet.find({ userId: req.user._id})
        .then(products => {
            console.log(products);
            res.render('admin/products',{
                prods: products,
                pageTitle: 'admin products',
                path: '/admin/products'
            })
        })
        .catch(err => {
            const error = new Error(error);
            error.httpStatusCode = 500;
            return next(error);
        })
}


/*********************************************
  getEditProduct(수정할 인풋에 데이터 가져오기)
**********************************************/

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect("/");
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {
        if(!product) {
            return res.redirect("/");
        }
        res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            editing: editMode,
            product: product,
            hasError: false,
            errorMessage: null,
            validationErrors: []
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    })
}


/*********************************************
        postEditProduct(데이터 수정하기)  
**********************************************/

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatePrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    const erros = validationResult(req);

    if(errors.isEmpty()){
        return res.status(422).render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit product",
            editing: true,
            hasError: true,
            product: {
                title: updatedTitle,
                imageUrl: updatedImageUrl,
                price: updatedPrice,
                description: updatedDesc,
                _id: prodId
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        })
    }
    Product.findById(prodId)
        .then(product => {
            if(product.userId.toString() !== req.user._idtoString()) {
                return res.redirect('/');
            }
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDesc;
            product.imageUrl = updatedImageUrl;

            return product.save().then(result => {
                console.log('updated product');
                res.redirect("/admin/products");
            })
        })

        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
 }


/*********************************************
        postDeleteProduct(데이터 삭제하기)
**********************************************/

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    product.deleteOne({_id: prodId, userId: req.user._id})
    .then(() => {
        console.log("Deleted product");
        res.redirect("/admin/products");
    })
    .catch(err => {
        const error = new Error(err);
        ErrorEvent.httpStatusCode = 500;
        return next(err);
    })
 }

