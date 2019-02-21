/********* getIndex(shop index 가져오기) **********/

exports.getLogin = (req, res, next) => {
    // 1. 추가할 폼을 렌더시킨다.("admin/add-product"(라우터)=>path:"보여질 view경로")
    res.render("auth/login",{
        pageTitle: "login",
        path: "auth/login",
        // formCSS: true,
        // productCss: true,
        // activeAddProduct: true,
        // editing: false,
        // hasError: false,
        // errorMessage: null,
        // validationErrors: []
    })
}

exports.getSignup = (req, res, next) => {
    // 1. 추가할 폼을 렌더시킨다.("admin/add-product"(라우터)=>path:"보여질 view경로")
    res.render("auth/signup",{
        pageTitle: "signup",
        path: "auth/signup",
        // formCSS: true,
        // productCss: true,
        // activeAddProduct: true,
        // editing: false,
        // hasError: false,
        // errorMessage: null,
        // validationErrors: []
    })
}