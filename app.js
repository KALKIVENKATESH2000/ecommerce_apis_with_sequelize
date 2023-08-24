const express = require("express");
const app = express();
const session = require('express-session');
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
const path  = require("path");
const PORT = 3001;

const userRouter = require('./routers/user.Router');
const bannerRouter = require('./routers/banner.Router');
const categoryRouter = require('./routers/category.Router');
const subcategoryRouter = require('./routers/subcategory.Router');
const childcategoryRouter = require('./routers/childcategory.Router');
const productRouter = require('./routers/product.Router');
const reviewRouter = require('./routers/review.Router');
const cartRouter = require('./routers/cart.Router');
const orderRouter = require('./routers/order.Router');


var corsOptions = {
    origin: "http://localhost:8081"
};

app.use('/media/uploads', express.static(__dirname + '/media/uploads'));

// Configure session middleware
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended:true,}));

app.use('/api/user', userRouter)
app.use('/api/banners', bannerRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/subcategories', subcategoryRouter)
app.use('/api/childcategories', childcategoryRouter)
app.use('/api/products', productRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})
