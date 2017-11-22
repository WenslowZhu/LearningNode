/**
 * Created by wenslow on 2017/7/9.
 */

'use strict';

const express = require('express');

const ALLOW_IPS = [
    '127.0.0.1',
    '123.456.7.89'
];

const api = express.Router();

api.use((req, res, next)=>{
    const userIsAllowed = ALLOW_IPS.indexOf(req.ip) !== -1;

    if (!userIsAllowed) {
        res.status(401).send('Not authorized');
    }else{
        next();
    }
});

api.get('/users', (req, res)=>{

});

api.post('/user', (req, res)=>{

});

api.get('/messages', (req, res)=>{

});

api.post('/messages', (req, res)=>{

});

module.exports = api;