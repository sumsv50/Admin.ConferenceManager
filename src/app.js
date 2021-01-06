const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
require('dotenv').config();
const moment = require('moment'); // Generate Date
const session = require("express-session");
const flash = require('connect-flash');

const Router = require('./routes/index');
const passport = require('./passport/index');
const authenticate = require('./middleware/authenticationMiddleware');

const PORT = process.env.PORT || 3000;

const app = express();

//Config and connect to MongoDB
const db = require('./config/db');
db.connect();

app.use(express.static(path.join(__dirname,'public')));

//Middleware parse req.body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Middleware passport
app.use(session({ 
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {},
 }));
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

app.use(authenticate);

app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
  })

//Method
app.use(methodOverride('_method'))

//Handlerbar
app.engine('.hbs', exphbs({
    extname: '.hbs',
    helpers: {
        ifEquals: function (arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        },

        ifIdEquals: function (arg1, arg2, options) {
            return (arg1.equals(arg2)) ? options.fn(this) : options.inverse(this);
        },
        generateDate: function (date, format) {
            return moment(date).format(format);
        }
    }
})
);

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));




//[Router]
Router(app);

app.listen(PORT);

