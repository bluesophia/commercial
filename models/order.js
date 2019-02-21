const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 1. 스키마 정의하기
const OrderSchema = new Schema({
    products: [
        {
            product: { type: Object, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    user: {
        email: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }
    }
})
// 정의 확인
console.log('OrderSchema 생성');

// 2. model 정의
// 파라메타1: 모델, 파라메타2: 스키마객체(둘 다 다른함수에도 사용 가능)
const Order = mongoose.model("order", OrderSchema);
console.log('Order model 생성')

module.exports = Order;
