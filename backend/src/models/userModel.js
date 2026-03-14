const pool = require('../config/db');
const createUser=async(full_name,email,password_hash)=>{
    const query=`Insert into users(full_name,email,password_hash)values($1,$2,$3)
    RETURNING id,full_name,email`;
    const values=[full_name,email,password_hash];
    const {rows}=await pool.query(query,values);
    return rows[0];
}
module.exports={createUser};