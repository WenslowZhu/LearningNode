/**
 * Created by wenslow on 2017/6/24.
 */
'use strict';

const connect = require('connect');
const router = require('./middleware/router');
//定义路由对象
const routes = {
    GET: {
        '/users': function (req, res) {
            res.end('tobi, loki, ferret');
        },
        '/user/:id': function (req, res) {
            res.end('user' + id);
        }
    },
    DELETE: {
        '/user/:id': function (req, res, id) {
            res.end('delete user' + id);
        }
    }
};

connect()
    .use(router(routes))
    .listen(3000);