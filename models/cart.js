const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./user');
const CartItem = require('./cart-item');

// 1. 스키마 정의하기
const CartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [
        { productId: { type: Schema.Types.ObjectId, ref: 'Product' },
          quantity: { type: Number }
        }
    ],
},{timeStamps: true})

// 정의 확인
console.log('CartSchema 생성');

// 2. model 정의
// 파라메타1: 모델, 파라메타2: 스키마객체(둘 다 다른함수에도 사용 가능)
const Cart = mongoose.model("carts", CartSchema);
console.log('Cart model 생성');

// 3. 모듈 export
module.exports = Cart;

