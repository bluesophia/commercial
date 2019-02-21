const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);// mongoDB 자체에는 세션이 없다. 세션을 만들어줘야한다
const csrf = require("csurf");
const flash = require("connect-flash");

// 내가 접속할 디비 주소
const MONGODB_URI = 
    "mongodb+srv://sophia:1234@cluster0-gf7qa.mongodb.net/test?retryWrites=true"

//  model

// const OrderItem = require('./models/order-item');

// model
const User = require('./models/user');
const Product = require('./models/product');
const Order = require('./models/order');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');


const app = express();

// store라는 객체화시킴
const store = new MongoDBStore({
    url: MONGODB_URI,
    collection: "session"
});

app.set("view engine", "ejs");
app.set("views", "views");

const csrfProtection = csrf({});
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// 세션을 사용한다.(middleware)
app.use(
    session({
        secret: "supersecret",
        resave: false,
        saveUninitialized: false,
        store
    })
)

// app.use((req, res, next) => {
//     User.findByPk(1)
//         .then(user => {
//             req.user = user;
//             next();
//         })
//         .catch(err => console.log(err));
// });

// app.use((req, res, next) => {
//     User.find({name: 'Jane'})
//         .then(user => {
//             req.user = user;
//             next();
//             // console.log("requser",req.user);
//         })
//         .catch(err => console.log(err));
// })

app.use(csrfProtection);
app.use(flash()); 



// session
app.use((req, res, next) => {
    if(!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if(!user) {
                return next();
            }
            req.user = user ;
            next();
        })
        .catch(err => {
            next(new Error(error));
        })
})

app.use((error, req, res, next) => {
    res.status(500).render("500", {
        pageTitle: "Internal server error",
        path: "500",
        isAuthenticated: req.session.isLoggedIn
    })
})

// auth
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLogedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
})

// route
app.use("/admin", adminRoutes);
app.use(shopRoutes);
 

// 컨트롤러
// app.use(errorController.get404);

// relation
// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE"});
// User.hasMany(Product);
// User.hasOne(Cart);
// User.hasMany(Order);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });

// Order.belongsTo(User);
// Order.belongsToMany(Product, { through: OrderItem });



// 아이디를 찾고 users의 컬렉션이 비어있을때 새로 하나 추가한다.
User.find({}, function(err, users){
    if(users.length === 0){
        return User.create({name: "Jane", email: "jane@gmail.com"}, function(err, users){
            // console.log("user created", users);
        })
    } else {
        // console.log('users', users);
    }
})



// ORM(object relation mapping)
mongoose
    .set('useCreateIndex', true)
    .connect(MONGODB_URI, { useNewUrlParser: true })
    .then(()=> {    
        app.listen(3000);
    })
    .then(()=> {
        console.log("mongodb connected");
    })
    .catch(err => {
        console.log(err);
    })
  