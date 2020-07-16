var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser = require('body-parser');
var router = require('./routes/index');
var ejs = require('ejs');

var app = express();
//使用bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//设置模板文件的目录
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎为ejs
app.set('view engine', 'ejs');
//为html扩展名注册ejs
app.engine('html',ejs.renderFile);
//配置网站公共资源路径
app.use("/public",express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//路由
router(app);

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
    res.render('error');
});

module.exports = app;