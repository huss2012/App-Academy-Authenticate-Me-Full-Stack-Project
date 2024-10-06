const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const routes = require('./routes');

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
//--------------Define error handler middlewares----------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------



module.exports = app
