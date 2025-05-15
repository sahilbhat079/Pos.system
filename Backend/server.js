// require('dotenv').config();
const config=require('./config/config')
const express = require('express');
const app = express();
const PORT = config.port || 3000;
const connectDB = require('./config/DB_Config');
const cookieParser = require("cookie-parser");
const cors = require('cors');


// we can use these two packages to makes our api secure and log the req detail like morgan is used to log the method,data ;
// 1 .const morgan = require("morgan");

// const helmet = require("helmet"); 
// 1.Prevents Security Attacks: Helps mitigate cross-site scripting (XSS), clickjacking, MIME sniffing, etc.
//  Sets Secure HTTP Headers: Automatically configures security-related headers.
//  Easy to Use: One-liner setup for improved security.


const { errorHandler, notFoundHandler } = require('./middlewares/Global_Errorhandler');
const handleError = require('./middlewares/Error_Handler.util');

connectDB(); // Connect to MongoDB

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies   
app.use(cors({ origin: 'http://localhost:5173', credentials: true, exposedHeaders: ["Authorization"] }));
app.use(cookieParser());



app.get('/', (req, res) => {
    res.send('Hello World!');
});


// Define your routes here
//authentication routes
app.use("/api/auth",require('./routes/AuthRouts'));

//table routes
app.use("/api/table", require('./routes/TableRoute'));

//order routes
app.use("/api/orders", require('./routes/OrderRoutes'));


//payment routes
app.use("/api/payment", require('./routes/PaymentRoutes'));


app.get('/throw-error', (req, res, next) => {
    // Simulate an unhandled error
    // This will be caught by the error handling middleware
    // This will be caught by the error handling middleware

     throw handleError(400, "Custom test error");

    throw new Error("Something broke unexpectedly!");
});


//error handling middleware
app.use(errorHandler); // Global error handling middleware
app.use(notFoundHandler); // Fallback middleware for unmatched routes


// Start the server
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
    console.log('Database connected successfully')
})