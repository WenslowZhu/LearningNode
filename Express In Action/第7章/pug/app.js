/**
 * Created by wenslow on 2017/7/10.
 */

'use strict';

const express = require('express');
const path = require('path');
const app = express();

// view engine setup
app.set('views', path.resolve(__dirname, ''));
app.set('view engine', 'pug');

const staticPath = path.resolve(__dirname, 'public');

app.use(express.static(staticPath));

app.use((req, res)=>{
    res.render('layout1');
});

app.listen(3000);