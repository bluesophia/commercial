const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 1. 스키마 정의하기
// const UserSchema = new Schema({
//     _id: Schema.Types.ObjectId,
//     name:{type:String, required: true},
//     email: String
// })

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: { type: Number, required: true }
            }
        ]
    }
})

UserSchema.methods.addToCart = function(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    // spread,복사
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        // 원본
        newQuantity = this.cart.item[cartProductIndex].quantity + 1;
        // 복사 그리고 다시 리사인
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        })
    }
    const updatedCart = {
        items: updatedCartItems
    };
    this.cart = updatedCart;
    return this.save();
};
userSchema.methods.removeFromCart = function(productId) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
}

userSchema.methods.clearCart = function() {
    this.cart = { items: [] };
    return this.save();
}

// 2. model 정의
// 파라메타1: 모델, 파라메타2: 스키마객체(둘 다 다른함수에도 사용 가능)
const User = mongoose.model("users", UserSchema);

// 3. 모듈 export
module.exports = User;
