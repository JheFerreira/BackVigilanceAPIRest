let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let cors = require('cors');

let app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


//banco de dados
const dbConnection = require('./config/database')();

//rotas da API

//criar/alterar/procurar/deletar usuario 

let usuarioRouter = require('./routes/usuario');
app.use('/usuario', usuarioRouter);

//fazer login/logout
let loginRouter = require('./routes/login');
app.use('/login', loginRouter);


// criar um novo cliente (openhouse)
let formOpenHouseRouter = require('./routes/formOpenHouse');
app.use('/formOpenHouse', formOpenHouseRouter);

// criar um novo cliente (casa fechada)
let formClosedHouseRouter = require('./routes/formClosedHouse');
app.use('/formClosedHouse', formClosedHouseRouter);

//Middleware de Erros
app.use(function(req, res, next) {
  let err = new Error ("Not Found")
  err.status = 404;
  next(err);
  });

  app.use(function(err, req, res, next) {
    return res.status(err.status || 500)
    .json({
      msg: err.message, 
      error: err
  });
});


module.exports = app;

