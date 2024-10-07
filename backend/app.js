const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const routes = require('./routes');
const { ValidationError } = require("sequelize");

const isProduction = environment === 'production';

const app = express();
//setUp the app to use morgan,cookieParser & express.json middleware:
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
//-----------------setUp the app to use security middlewares-----------------------------------------------------
//Corss-Origin Resource Shearing is allowed only in development:
//Why? => in development the frontend and backend will be served from defferent servers.
//in production we do not want the application to have the ability to use CORS, it is considered as vernalibilty.
if (!isProduction) {
    app.use(cors());
};
app.use(
    helmet.crossOriginResourcePolicy({
        policy: 'cross-origin'
    })
);
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);
//--------------------------------------------------------------------------------------------------------------
//------------------Define API end points to the app to use-----------------------------------------------------
app.use(routes);
//--------------------------------------------------------------------------------------------------------------
//--------------Setup error handler middlewares-----------------------------------------------------------------
//1.Not Found Error-Handler:
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource coudn't be found."];
    err.status = 404;
    next(err);
});
//2.Sequelize Error-Handler:
app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = "Validation error";
    };
    next(err);
});
//3.Error Formatter Error-Handler:
app.use((err, _res, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
});
//--------------------------------------------------------------------------------------------------------------



module.exports = app
