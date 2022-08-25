var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var canchasRouter = require('./routes/canchas');
var likesRouter = require('./routes/likes');
var comentariosRouter = require('./routes/comentarios');
var cors = require('cors')

var app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: ['futfinderProyect'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usersRouter);
app.use('/canchas', canchasRouter);
app.use('/likes', likesRouter);
app.use('/comentarios', comentariosRouter);

module.exports = app;
