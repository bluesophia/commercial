const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 1. 스키마 정의하기
const CartItemSchema = new Schema({
    products: [
        { productId: { type: Schema.Types.ObjectId, ref: 'Product' },
          quantity: { type: Number }
        }
    ],
})

// 정의 확인
console.log('CartItemSchema 생성');

// 2. model 정의
// 파라메타1: 모델, 파라메타2: 스키마객체(둘 다 다른함수에도 사용 가능)
const CartItem = mongoose.model("cartItems", CartItemSchema);
console.log('CartItem model 생성')

module.exports = CartItem;
