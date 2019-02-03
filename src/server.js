const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');
const https = require('https')
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const axios = require('axios');
const shrinkRay = require('shrink-ray-current');
require('./app/models/user');
require('./app/models/vehicle');
require('./app/models/journey');
require('./app/models/rating');

const { url } = require('./config/database.js');

const certOptions = {
    key: fs.readFileSync('src/server.key'),
    cert: fs.readFileSync('src/server.crt')
}

mongoose.connect(url);

require('./config/passport')(passport);

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(shrinkRay());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// required for passport
app.use(
    session({
        secret: 'faztwebtutorialexample',
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
require('./app/routes.js')(app, passport);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start the server
// app.listen(app.get('port'), () => {
//     console.log('server on port ', app.get('port'));
// });

https.createServer(certOptions, app).listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));

});