const express = require('express');
const userRoutes = require('./api/routes/userRoutes');
const workoutRoutes = require('./api/routes/workoutRoutes');
const db = require('./api/util/database');
const morgan = require('morgan');
const app = express();
const helmet = require('helmet');
const helmet = require('compression');



app.use(morgan('dev'));
app.use(express.urlencoded());
app.use(express.json());

app.use(helmet());
app.use(compression());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin",
        '*');
    res.header("Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept, Authorization, X-Requested-With");

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, DELETE, GET, POST, PATCH');
        return res.status(200).json({});
    }
    next();
});

app.use('/user', userRoutes);
app.use('/workout', workoutRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.number = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.number || 500).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;