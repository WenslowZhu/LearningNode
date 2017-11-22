/**
 * Created by wenslow on 2017/7/10.
 */

'use strict';

const express = require('express');
const api = express.Router();

api.get('/timezone', (req, res)=>{
    res.send('API 2: super cool new response for /timezone');
});

module.exports = api;