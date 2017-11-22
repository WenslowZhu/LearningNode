/**
 * Created by wenslow on 2017/7/9.
 */

'use strict';

const express = require('express');
const app = express();

// 日志记录中间件
app.use((req, res, next)=>{
    console.log('In come a ' + req.method + ' to ' + req.url);
    next()
});

//只有偶数分钟才通过验证
app.use((req, res, next)=>{

    const minute = (new Date()).getMinutes();

    if ((minute % 2 ) === 0) {
        next();
    }else{
        res.statusCode = 403;
        res.end('Not authorized.\n');
    }
});

//发送密码
app.use((req, res)=>{
    res.end('Secret info: the password is " swordfish"!\n');
});

app.listen(3000);