// app.js
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/database");
const productRoutes = require("./routes/products.route"); // Import các route cho sản phẩm
const orderRoutes = require("./routes/orders.route"); // Import các route cho đơn hàng
const userRoutes = require("./routes/users"); // Import các route cho người dùng
const orderDetailRoutes = require("./routes/OrderDetailRoute"); // Import các route cho chi tiết đơn hàng
const cors = require('cors');
require("dotenv").config();

const app = express();

// Kết nối đến cơ sở dữ liệu
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Sử dụng các routes
app.use("/api/products", productRoutes); // Duyệt đến các route cho sản phẩm
app.use("/api/orders", orderRoutes); // Duyệt đến các route cho đơn hàng
app.use("/api/users", userRoutes); // Duyệt đến các route cho người dùng
app.use("/api/orderdetails", orderDetailRoutes); // Duyệt đến các route cho chi tiết đơn hàng

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;

