/**
 * Created by wenslow on 2017/7/9.
 */

'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

//引入 morgan
const morgan = require('morgan');

const app = express();

//使用Morgan中间件来记录日志
app.use(morgan('short'));

// //记录所有传来的请求
// app.use((req, res, next)=>{
//     console.log('Request IP: ' + req.url);
//     console.log('Request date: ' + new Date());
//     next();
// });

//设置静态文件
const staticPath = path.join(__dirname, 'static');
app.use(express.static(staticPath));

// app.use((req, res, next)=>{
//     //使用path.join来寻找文件的真实路径
//     const filePath = path.join(__dirname, 'static', req.url);
//
//
//
//     //内置的fs.stat获取文件信息
//     fs.stat(filePath, (err, fileInfo)=>{
//         //如果fs.stat错误,继续到下一个中间件
//         if (err) {
//             next();
//             return;
//         }
//
//         //如果文件存在则调用res.senfFile
//         if (fileInfo.isFile()) {
//             res.sendFile(filePath);
//         }else{
//             //不存在则调用下一个中间件
//             next();
//         }
//     });
// });


app.use((req, res)=>{
    //设置状态码为404
    res.status(404);
    res.send('File not found');
});

//在3000端口启动
app.listen(3000, ()=>{
    console.log('App started on port 3000');
});