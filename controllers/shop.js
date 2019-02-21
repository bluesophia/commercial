const Product = require("../models/product");
const Cart = require("../models/cart");
const Order = require("../models/order");
const CartItem = require("../models/cart-item");
// const Sequelize = require("sequelize");


/********* getIndex(shop index 가져오기) **********/
 exports.getIndex = (req, res, next) => {
    console.log("getIndex start");

    Product.find({})
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

/********* getProducts(product목록 가져오기) **********/
exports.getProducts = (req, res, next) => {
    Product.find({})
            .then(products => {
                // 2. 콘솔에 찍어준다.
                console.log("get Index", products);
                // 3. 찾은 데이터들을 모두 "/products"에 렌더시킨다.
                res.render("shop/product-list", {
                    prods: products,
                    title:products.title,
                    price:products.price,
                    description:products.description,
                    pageTitle: "All Product",
                    path: "/products"
                })
            })
            // 4. 에러가 있을 경우 실행시킨다.
            .catch(error => console.log(error));
}
/********* getProduct(상품 디테일 가져오기) **********/
exports.getProduct = (req, res, next) => {
    // 1. 내가 클릭한 카드의 아이디를 가져온다.
    const { productId } = req.params;
    // 2. 가져온 아이디가 잘 들어왔는지 확인한다.
    console.log("productId", productId);
    // 3. 아이디를 Product모델에서 찾는다.
    Product.findOne({_id:productId})
        // products => 파라메타
        // 화살표함수(파라메타) => {statements} 
        .then(product => {
            // 5. productId에 대한 파라메타(변수)를 확인한다.
            console.log("product", product);
            // 6. 인풋으로 가져와 렌더시킨다.   
            res.render("shop/product-detail", {
                // 대입(product:product를 하지 않으면 product자체가 안먹음)
                // products로 하면 안먹음..왜그런지 여쭤보기
                product: product,
                pageTitle: "detail Product",
                title: product.title,
                price:product.price,
                description:product.description,
                editing: true,
                path:""
            })
        })
}
/********* getCart() **********/
exports.getCart = (req, res, next) => {
    
    Product.find({_id:Cart._id})
            .then(products => {
                // 2. 콘솔에 찍어준다.
                console.log("carts", products);
                // 3. 찾은 데이터들을 모두 렌더시킨다.
                res.render("shop/cart", {
                    products: products,
                    pageTitle: "All Product",
                    // view경로
                    path: "/cart"
                })
            })
            // 4. 에러가 있을 경우 실행시킨다.
            .catch(error => console.error(err));
}



/********* postCart(장바구니 버튼 눌렀을 때 데이터 보내기) **********/
exports.postCart = (req, res, next) => {
    // 1. 버튼을 눌렀을 때 해당 파람을 가져온다
    const { productId, title } = req. body;
    // 2. 가져온 파람 확인한다.
    console.log("productId", productId);
    Product.find({_id: productId})
            .then(()=> {
            // 4. 인스턴스된 카트 확인 
            console.log("cart", productId);
            // 5. 확인된 데이터를 넣는다. (세션)
            })
            
        req.user
        Cart.create({
            _id:productId
        })
        .then(()=> {
            console.log("created", Cart);
        })
        // 7. 결과물을 홈으로 리다이렉트 시킨다. 
        .then(result => res.redirect("/cart"))
        // 8. 에러가 있을 경우 실행시킨다.
        .catch(error => console.log(error));   
}


/********* getOrders(주문하기) **********/
// exports.getOrders = (req, res, next) => {
//     // 1. 버튼을 눌렀을 때 해당 파람을 가져온다
//     const { productId, order } = req.body;
//     // 2. 가져온 파람 확인한다.
//     console.log("productId", productId);
//     // 4. 인스턴스된 카트 확인 
//     Product.find({_id:productId})
//         .then(order, products => {
//             // 6. 인풋으로 가져와 렌더시킨다.   
//             res.render("shop/orders", {
//                 order: order,
//                 title: products.title,
//                 quantity: products.orderItems.quantity,
//                 pageTitle: "order",
//                 path:""
//             })
//         })
//         // 8. 에러가 있을 경우 실행시킨다.
//         .catch(error => console.log(error));    
// }
/********* postOrder() **********/
/********* getCheckout() **********/
/********* postCartDeleteProduct() **********/


