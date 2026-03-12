
const express  = require("express");
const app = express();
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");

const bodyParser = require("body-parser");
require("dotenv").config();
require("./Models/db");

const port = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use(cors());



app.get("/ping" , (req,res) =>{

    res.send("pong");
});


app.use("/auth" , AuthRouter);
app.use("/products",ProductRouter);

// app.listen(port ,()=>{
//     console.log(`Server is running on port ${port}`);
// })


module.exports = app;