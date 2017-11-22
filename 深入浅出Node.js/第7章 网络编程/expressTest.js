/**
 * Created by wenslow on 2017/7/8.
 */

'use strict';

const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    req.send('Hello world');
});

app.listen(3000, ()=>{
    console.log('Express app started on port 3000');
});