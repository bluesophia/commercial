const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 1. 스키마 정의하기
const ProductSchema = new Schema({
    title:{type:String, required: true},
    price:{type:Number, required: true},
    imageUrl:{type:String, required: true},
    description:{type:String, required: true},
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    
},  { autoIndex: false })
// 정의 확인
console.log('ProductSchema 생성');

// 2. model 정의
// 파라메타1: 모델, 파라메타2: 스키마객체(둘 다 다른함수에도 사용 가능)
const Product = mongoose.model("products", ProductSchema);
console.log('Product model 생성')

module.exports = Product;

