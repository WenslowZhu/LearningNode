/**
 * Created by wenslow on 2017/6/24.
 */
'use strict';

const connect = require('connect');
const app = connect().use(connect.bodyParser()).use(function (req, res) {
    {
        res.end('Registered new user: ' + req.body.username);
    };
});