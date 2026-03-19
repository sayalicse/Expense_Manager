// controllers/authController.js
const { createUser,loginUser } = require('../models/userModel');

const register = async (req, res) => {
    try {
        // We pass the raw body to the model, which handles Zod validation
        const result = await createUser(req.body);

        // If successful, send the user data and token
        res.status(201).json({
            message: "User registered successfully",
            ...result
        });
    } catch (error) {
        // Catch Zod validation errors or Database errors
        // You can check if it's a Zod error to send a 400, otherwise 500
        const statusCode = error.name === 'ZodError' ? 400 : 500; 
        res.status(statusCode).json({ error: error.message });
    }
};
const login=async(req,res)=>{
    try{
        const userresult=await loginUser(req.body);
        res.status(200).json({
            msg:"User logged in sucessfully",
            ...userresult
        
            
        });

    }catch(err){
       const statusCode = err.name === 'ZodError' ? 400 : 500; 
        res.status(statusCode).json({ error: err.message });
    }

}

module.exports = { register,login };