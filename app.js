require('express-group-routes');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes 
app.group("/api", (router) => {
    router.use('/users', require('./routes/user.router'))
})

// handle an error
app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Invalid server error"
    res.status(error.statusCode).json({
        success: false,
        message: error.message
    })
})

module.exports = app