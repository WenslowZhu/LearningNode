/**
 * Created by wenslow on 2017/7/10.
 */

'use strict';

const express = require('express');
const morgan = require('morgan');
const app = express();
//引入router
const apiVersion1 = require('./api1.js');
const apiVersion2 = require('./api2.js');

app.use(morgan('short'));

//使用router
app.use('/v1', apiVersion1);
app.use('/v2', apiVersion2);

app.listen(3000);