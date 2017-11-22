/**
 * Created by wenslow on 2017/6/24.
 */

'use strict';

const connect = require('connect');

const app = connect();
app.use(connect.logger());
app.use(hello);
app.listen(3000);

function hello(req, res) {
    res.end('Hello');
}