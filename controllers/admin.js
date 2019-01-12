const Product = require("../models/product");


/********* postAddProduct(데이터 추가하기) **********/

exports.postAddProduct = (req, res, next) => {
    // 1. 추가할 데이터를 form에서 가져온다.
    const { title, imageUrl, description, price } = req. body;
    // 2. 데이터가 잘 들어왔는지 확인한다.
    console.log(req.body);
    // 3. 확인된 데이터를 새로운 오브젝트에 담아 인스턴스화 시킨다.
    const product = new Product( title, imageUrl, description, price )
    // 4. 인스턴스된 product를 확인한다.
    console.log("product", product);
    // 5. 확인된 데이터를 넣는다. (세션)
    req.user
        // 6. sequelize에서 자동생성함수 실행시킨다.
        .createProduct({ title, imageUrl, description, price })
        // 7. 결과물을 홈으로 리다이렉트 시킨다. 
        .then(result => res.redirect("/"))
        // 8. 에러가 있을 경우 실행시킨다.
        .catch(error => console.error(err));    
}


/********* getAddProduct(추가한 데이터 가져오기) **********/

exports.getAddProduct = (req, res, next) => {
    // 1. 추가할 폼을 렌더시킨다.("admin/add-product"(라우터)=>path:"보여질 view경로")
    res.render("admin/add-product",{
        pageTitle: "Add Product",
        path: "admin/add-product",
        // css가져올건지
        formCSS: true,
        productCss: true,
        // 여쭤보기
        activeAddProduct: true,
        // editing중인지
        editing: false
    })
}


/********* getProducts(추가한 데이터 all product에 가져오기) **********/

exports.getProducts = (req, res, next) => {
    // 1. Product모델의 데이터를 모두 찾는다.
    Product.findAll()
        .then(products => {
            // 2. 콘솔에 찍어준다.
            console.log("get Index");
            // 3. 찾은 데이터들을 모두 "/admin/products"에 렌더시킨다.
            res.render("admin/products", {
                prods: products,
                pageTitle: "All Product",
                // view경로
                path: "/admin/products"
            })
        })
        // 4. 에러가 있을 경우 실행시킨다.
        .catch(error => console.error(err));
    
}


/********* getEditProduct(수정할 인풋에 데이터 가져오기) **********/

exports.getEditProduct = (req, res, next) => {
    // 1. 내가 클릭한 카드의 아이디를 가져온다.
    const { productId } = req.params;
    // 2. 가져온 아이디가 잘 들어왔는지 확인한다.
    console.log("productId", productId);
    // 3. 아이디를 Product모델에서 찾는다.
    Product.findById(productId)
        // products => 파라메타
        // 화살표함수(파라메타) => {statements} 
        .then(product => {
            // 5. productId에 대한 파라메타(변수)를 확인한다.
            console.log("product", product);
            // 6. 인풋으로 가져와 렌더시킨다.   
            res.render("admin/edit-product", {
                // 대입(product:product를 하지 않으면 product자체가 안먹음)
                // products로 하면 안먹음..왜그런지 여쭤보기
                product: product,
                pageTitle: "Edit Product",
                title: product.title,
                // 에디팅이 되고 있는지 아닌지 true, false로 나눔
                editing: true,
                // 경로(?)
                path:""
            })
        })
}


/********* postEditProduct(데이터 수정하기) **********/

exports.postEditProduct = (req, res, next) => {
    // 1. form에서 가져온 수정사항을 보낼 데이터(요청할바디)를 확인한다
    const { title, imageUrl, price, description, productId } = req.body;
    // 2. Product모델의 내가 선택한 아이디 찾는다
    Product.findById(productId)
    // 3. ProductId가 잘 들어왔는지 확인한다
    console.log("productId", productId);
            // 수정사항을 업데이트한다-> Product모델에 업데이트-> 내가 수정해서 받아온 body를
            // where -> 내가 찾은 수정할 아이디에다가 넣는다.
            Product.update(
                {
                    title: title,
                    imageUrl: imageUrl,
                    price: price,
                    description: description
                },
                { where: 
                    {
                        // 아이디를 찾아서 넣을 것 
                        id: productId
                    }
                }
            )
        // 4. 수정이 완료된 다음에는 홈으로 리다이렉트를 시킨다.    
        .then(result => res.redirect("/"))
        // 5. 에러가 있을 경우 에러를 실행한다.    
        .catch(error => console.error(error));
 }


/********* postDeleteProduct(데이터 삭제하기) **********/

exports.postDeleteProduct = (req, res, next) => {
    // 1. 삭제할 카드의 데이터 아이디를 가져온다.
    const { productId } = req.body;
    // 2. ProductId가 잘 들어왔는지 확인한다.
    console.log("productId", productId);
    // 3. 모델에서 해당 아이디를 삭제한다.
    Product.destroy({where : { id: productId }})
    // 4. 완료된 후에는 리다이렉트를 실행한다.
    .then(result => res.redirect("/"))
    // 5. 에러가 있을 경우 에러를 실행한다.
    .catch(error => console.error(error));
 }
