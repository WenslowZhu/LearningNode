/**
 * Created by wenslow on 2017/6/24.
 */
'use strict';

const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.send('hello');
});
app.listen(3000);