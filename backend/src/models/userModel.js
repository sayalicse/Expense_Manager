const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { userSchema } = require('../schema/userSchema');
const { loginSchema } = require('../schema/loginSchema');
const createUser=async(userData)=>{
    const validatedata=userSchema.parse(userData);
    
    
    const {full_name,email,password}=validatedata;
    const salt=await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt); 
    try{
       const query=`Insert into users(full_name,email,password_hash)values($1,$2,$3)
    RETURNING id,full_name,email`;
    const values=[full_name,email,password_hash];
    const {rows}=await pool.query(query,values);
    const user=rows[0];
    const token = jwt.sign(
        { id: user.id, email: user.email }, 
        process.env.SECRET_KEY, 
        { expiresIn: '1h' }
    );
    return {user,token};
    
    }catch(dbError){
        if (dbError.code === '23505') {
            throw new Error('Email already registered.');
        }
        throw dbError;
    }
    
    
}
// models/userModel.js

const loginUser = async (userData) => {
    const validuser=loginSchema.parse(userData);
    const {email,password}=validuser
    // 1. Find user by email
    const query = `SELECT * FROM users WHERE email = $1`;
    const { rows } = await pool.query(query, [email.toLowerCase().trim()]);
    const user = rows[0];

    // 2. If user doesn't exist
    if (!user) {
        throw new Error('Invalid email or password');
    }

    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    // 4. Generate Token
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    );

    // Don't send the password_hash back to the client
    delete user.password_hash;
    return { user, token };
};
module.exports={createUser,loginUser};