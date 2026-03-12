const mongoose = require("mongoose");


const mongo_url = process.env.MONGO_URI;
console.log("MongoDB URL:", mongo_url);

mongoose.connect(mongo_url)
.then(() =>{
    console.log("MongoDB Connected ....");
}).catch((err) =>{
    console.error("Error connecting to MongoDB:", err);
});