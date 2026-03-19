const {createexpense,getUserExpenses}=require('../models/expenseModel');
const expense=async(req,res)=>{
    try{
        const result=await createexpense(req.body);
        res.status(201).json({
            message: "Expenses added successfully",
            ...result
        });

    }
    
    
    catch(error){
const statusCode = error.name === 'ZodError' ? 400 : 500; 
        res.status(statusCode).json({ error: error.message });
    }
}
const getuserexpense=async(req,res)=>{
    try{
        const getexpenseresult=await getUserExpenses(req.body.user_id);
        res.status(200).json({
            message: "Expenses get successfully",
            expense:getexpenseresult
        });

    }
    
    
    catch(error){
const statusCode = error.name === 'ZodError' ? 400 : 500; 
        res.status(statusCode).json({ error: error.message });
    }
}
module.exports = {expense,getuserexpense};