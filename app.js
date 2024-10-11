const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/database");
require("dotenv").config();

const app = express();

connectDB();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;

