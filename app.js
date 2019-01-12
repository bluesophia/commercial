const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

//util
const sequelize = require('./util/database');

// model
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
 
// app.use(errorController.get404);

// relation
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE"});
User.hasMany(Product);
User.hasOne(Cart);
User.hasMany(Order);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        console.log(2);
        if(!user) {
            return User.create({ name: "Sophia", email: "4650ph@gmail.com"});
        }
        return user;
    })
    .then(user => user.createCart())
    .then(cart => app.listen(3000))
    .catch(err => {
        console.log(err);
    })
    