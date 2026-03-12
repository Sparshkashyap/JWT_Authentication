
const UserModel = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {

    try{

        const { name, email, password } = req.body;
        
        const  user = await UserModel.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists",success:false });
        }


        const userModel = new UserModel({name,email,password});

        const passwordHash = await bcrypt.hash(password,10);

        userModel.password = passwordHash;

        await userModel.save();

        res.status(201).json({ message: "Sign up successfully",success:true });

    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error",success:false,error:err.message });

    }

}

const login = async (req, res) => {

    try{

        const { email, password } = req.body;
        
        const  user = await UserModel.findOne({ email });

        const errorMessage = "Auth Failed email or password is wrong";

        if (!user) {
            return res.status(403).json({ message: errorMessage,success:false });
        }


        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            return res.status(403).json({ message: errorMessage,success:false });
        }

        const jwttoken = jwt.sign({ userId :user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:"24h"});

        res.status(201).json({ message: "Login successfully",success:true,jwttoken,email:user.email,name:user.name});

    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error",success:false });

    }

}

module.exports = {
    signup,
    login

}