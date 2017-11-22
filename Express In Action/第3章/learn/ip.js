/**
 * Created by wenslow on 2017/7/9.
 */

'use strict';

const express = require('express');
const app = express();

const EVIL_IP = '123.45.67.89';

app.use((req, res, next)=>{
    console.log(req.ip);
    if (req.ip === EVIL_IP) {
        res.statusCode(401).send('Not allowed!\n');
    }else{
        next();
    }
});

app.use((req, res)=>{
    res.end('Good.\n');
});

app.listen(3000);