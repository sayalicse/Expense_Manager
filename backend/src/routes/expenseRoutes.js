const express = require('express');
const router = express.Router();
const {expense,getuserexpense} = require('../controllers/expenseController');

// POST /api/auth/register
router.post('/expense', expense);
router.get('/getuserexpense',getuserexpense);


module.exports = router;