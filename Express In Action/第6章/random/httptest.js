/**
 * Created by wenslow on 2017/7/10.
 */

'use strict';

const express = require('express');
const logger = require('morgan');
const app = express();

app.use(logger('short'));

app.get('/', (req, res)=>{
    res.send('you just sent a GET request, friend\n');
});

app.post('/', (req, res)=>{
    res.send('a POST request? nice\n');
});

app.put('/', (req, res)=>{
    res.send('i don\'t see a lot of PUT requests anymore\n');
});

app.delete('/', (req, res)=>{
    res.send('oh my, a DELETE??\n');
});

app.listen(3000);