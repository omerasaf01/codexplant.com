var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require("mysql")
var { db } = require("./database")
var routes = require("./Settings/routes")
var { body, validationResult } = require("express-validator")
require("dotenv").config()
var bodyParser = require("body-parser")

var dbn = process.env

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser())
//app.use(express.bodyParser())

//ROUTERS

for (var i = 0; i < routes.length; i++) {
  app.use(routes[i].path.toString(), routes[i].name);
}

//Settings
const port = 5000

//MYSQL

// view engine setup

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.stack);
});


module.exports = app;

app.listen(port, function() {
	console.log("Server Aktif")
})