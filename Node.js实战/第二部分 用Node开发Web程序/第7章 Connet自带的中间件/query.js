/**
 * Created by wenslow on 2017/6/24.
 */
'use strict';

const connect = require('connect');

const app = connect()
        .use(connect.query())
        .use((req, res, next)=>{
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(req.query));
    }).listen(3000);