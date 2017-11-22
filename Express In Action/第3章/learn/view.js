/**
 * Created by wenslow on 2017/7/9.
 */

'use strict';

const express = require('express');
const path = require('path');
const app = express();

//告诉Express你的视图存在于一个views的文件夹中
app.set('views', path.resolve(__dirname, 'views'));
//告诉Express你将使用EJS模板引擎
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index', {message: 'Hey everyone! This is my webpage.\n'});
});

app.listen(3000);