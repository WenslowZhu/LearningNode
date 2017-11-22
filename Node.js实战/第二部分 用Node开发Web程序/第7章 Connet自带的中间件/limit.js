/**
 * Created by wenslow on 2017/6/24.
 */
'use strict';

const connect = require('connect');

function type(type, fn) {
    return function (req, res, next) {
        const ct = req.headers['content-type'] || '';
        //被返回的中间件首先检查content-type
        if (0 !== ct.indexOf(type)){
            return next();
        }
        //调用传入的limit组件
        fn(req, res, next);
    };
}

// const app = connect()
//     .use(type('application/x-www-form-urlencoded', connect.limit('64kb'))
//         .use()

