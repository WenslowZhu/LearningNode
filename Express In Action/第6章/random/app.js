/**
 * Created by wenslow on 2017/7/10.
 */

'use strict';

const express = require('express');
const logger = require('morgan');
const app = express();

app.use(logger('short'));

app.get('/random/:min/:max', (req, res)=>{
    //通过请求URL传入两个
    const min = parseInt(req.params.min);
    const max = parseInt(req.params.max);

    //进行错误检测,只要一个出了问题,那么就直接响应错误信息
    if (isNaN(min) || isNaN(max)) {
        res.status(400);
        res.json({error: 'Bad request'});
        return;
    }

    //计算结果并以JSON形式返回
    const result = Math.round((Math.random() * (max - min)) + min);
    res.json({result: result});
});

app.listen(3000, ()=>{
    console.log('App started on port 3000');
});