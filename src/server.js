// Initializes and starts the Express server
const express = require('express');
const app = express();
const userRoutes = require('./routes/UserRoutes');

app.use(express.json());
app.use('/users', userRoutes); // Registers routes for /users endpoints

// Starts server on specified port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});