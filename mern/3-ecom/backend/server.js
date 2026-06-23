import express from "express";
import dotenv from "dotenv";
import User from "./models/User.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        msg:"Hello"
    })
})

app.post("/register", async(req, res) => {


    try{


        const { name, email, password } = req.body;

        const userExists = await User.findOne( {email} );

        if(userExists){
            return res.status(400).json({message:`User already exists`});
        }

        const user = await User.create(
        { 
            name, 
            email,
            password
        }
        );

        if(user){
            res.status(201).json({
                user, 
                success:true
            })
        }else{
            res.status(400).json({message:`Invalid user data`})
        }

    }catch(error){
        res.status(500).json({message:error.message})
    }


})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is running 4000");
})