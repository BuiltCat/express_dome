const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const logger = require('./utils/loggers/logger');
const HTTPErrorHandler = require('./middlewares/http_error_handler');
const UnexpectedErrorHandler = require('./middlewares/unexpected _error_hander');
const ResourceNotFoundError = require('./errors/resource_not_found_error');
const auth = require('./middlewares/auth');

const pages = require('./routes/api/pages');
const users = require('./routes/api/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/favicon.ico',(req, res)=>{
  res.end();
});
// 文章api接口
app.use('/pages', pages);
// 用户api接口
app.use('/users', users);

app.post('/auth', auth() ,(req, res) => {
    res.json(req.user);
});

app.use((req, res, next) => {
  if(!req.headersSent){
    next(new ResourceNotFoundError(req.method, req.path, '好像没有这个啊~'));
  }
})
// 错误处理接口
app.use(HTTPErrorHandler());

// 防止发生不可预期的错误
app.use(UnexpectedErrorHandler());

process.on('uncaughtException', (err) => {
  logger.error('uncaught exception', { err });
});

process.on('unhandledReject', (reason, p) => {
  logger.error('unhandledRejection', { reason, p });
});

module.exports = app;
