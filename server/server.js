// Server
const express = require('express');
const connectDB = require('../config/db');

const app = express();

// Connect to Database
connectDB();

// init middleware - can accept request body now.
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/kinos', require('./routes/kinos'));
app.use('/api/reviews/', require('./routes/reviews'));

const PORT = process.env.PORT || 5000;

// Activates the server
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
