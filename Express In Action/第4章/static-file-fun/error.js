/**
 * Created by wenslow on 2017/7/9.
 */

'use strict';

const express = require('express');
const path = require('path');
const app = express();

const filePath = path.join(__dirname, 'celine.jpg');

app.use((req, res, next)=>{
    res.sendFile(filePath, (err)=>{
        if (err) {
            //快速进入错误模式
            next(new Error('Error sending file!'));
        }
    });
});

//错误处理中间件, 确保指定了第四个参数
app.use((err, req, res, next)=>{
    console.error(err.message.toString());
    next(err);//继续到下一个错误处理中间件
});

//确保指定了第四个参数
app.use((err, req, res, next)=>{
    res.status(500);
    res.send('Internal server error.\n');
});

app.listen(3000, ()=>{
    console.log('App started on port 3000');
});