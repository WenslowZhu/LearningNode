/**
 * Created by wenslow on 2017/7/15.
 */

'use strict';

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

//把所有路由放到另一个文件
const router = require('./routes');

const app = express();

//连接MongoDB服务器的test数据库
mongoose.connect('mongodb://localhost:27017/test');

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//使用4个中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use(router);

app.listen(app.get('port'), ()=>{
    console.log('Server started on port ' + app.get('port'));
});