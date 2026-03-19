// index.js
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
require('dotenv').config();

const app = express();
app.use(express.json()); // Essential for parsing JSON bodies!

app.use('/api/auth', authRoutes);
app.use('/api/expenseRoute',expenseRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));