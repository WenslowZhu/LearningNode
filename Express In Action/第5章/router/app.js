/**
 * Created by wenslow on 2017/7/9.
 */

'use strict';

const express = require('express');
const path = require('path');
const app = express();

//引入自己的Router
const apiRouter = require('./routes/api_router');

const staticPath = path.resolve(__dirname, 'static');
app.use(express.static(staticPath));

//使用你自己的Router
app.use('/api', apiRouter);

app.listen(3000);