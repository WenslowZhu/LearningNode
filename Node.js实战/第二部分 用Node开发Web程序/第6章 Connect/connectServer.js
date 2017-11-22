/**
 * Created by wenslow on 2017/6/24.
 */

'use strict';

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}

function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello world\n');
}

//认证
function restrict(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) return next(new Error('Unauthorized'));

    const parts = authorization.split(' ');
    const scheme = parts[0];
    const auth = new Buffer(parts[1], 'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];

    authenticateWithDatabase(user, pass, (err)=>{
        if (err) throw err;
        next();
    });
}

function authenticateWithDatabase(user, pass, cb) {
    if (user === 'tobi'){
        cb();
    }else{
        cb(new Error());
    }
}

//显示管理面板的中间件
function admin(req, res, next) {
    switch (req.url){
        case '/':
            res.end('Try /users');
            break;
        case '/user':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(['tobi', 'loki', 'jane']));
    }
}

const connect = require('connect');

connect()
    .use(logger)
    .use('/admin', restrict)
    .use('/admin', admin)
    .use(hello)
    .listen(3000);
