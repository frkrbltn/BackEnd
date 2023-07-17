const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose  = require("mongoose");

mongoose.connect("mongodb+srv://frkrbltn2332:Valarmorghulis23.@cluster0.c8iqbem.mongodb.net/?retryWrites=true&w=majority");
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/order");

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS error handling
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // * means any origin can access
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // * means any origin can access
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET"); // * means any origin can access
    return res.status(200).json({});
  }
  next();
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);



app.use((req, res, next) => {
  const error = new Error("Not found (This is error handling middleware))");
  error.status = 404;
  next(error);
  // Forward the error request to the next error handling
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
    message: error.message
    }
  });
});

module.exports = app;
