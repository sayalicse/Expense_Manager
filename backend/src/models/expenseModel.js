const { error } = require('node:console');
const pool = require('../config/db');
const {expenseSchema}=require('../schema/expenseSchema');
const createexpense=async(expensedata)=>{
    const validexpense=await expenseSchema.parse(expensedata);
    const{user_id, amount, category_id, title, metadata}=validexpense;
    try{
        const query = `
    INSERT INTO expenses(user_id, amount, category_id, title, metadata)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
`;
       const values=[user_id,amount,category_id || null,title,metadata || null];
       const {rows}=await pool.query(query,values);
    const user=rows[0];
    return {user};

    }catch(dbError){
        if (dbError.code === '23505') {
            throw new Error('Email already registered.');
        }
        throw dbError;
    }
    if(error){
        return resizeBy.status(400).json({
            msg:"error"
        })
    }
}
const getUserExpenses = async (user_id) => {
    const query = `
        SELECT * FROM expenses
        WHERE user_id = $1
        ORDER BY created_at DESC;
    `;

    const result = await pool.query(query, [user_id]);
    console.log("DB RESULT:", result.rows);
    return result.rows;
};


module.exports={createexpense,getUserExpenses};