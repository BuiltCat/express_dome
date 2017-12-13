const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const HTTPErrorHandler = require('./middlewares/http_error_handler');
const UnexpectedErrorHandler = require('./middlewares/unexpected _error_hander');

const pages = require('./routes/api/pages');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/favicon.ico',(req, res)=>{
  res.end();
});
// 文章api接口
app.use('/pages', pages);
// 错误处理接口
app.use(HTTPErrorHandler());

// 防止发生不可预期的错误
app.use(UnexpectedErrorHandler());

module.exports = app;
