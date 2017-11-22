/**
 * Created by wenslow on 2017/6/24.
 */

'use strict';

const connect = require('connect');
const app = connect()
    .use(connect.cookieParser('tobi is cool ferret'))
    .use((req, res)=>{
        console.log(req.cookies);
        console.log(req.signedCookies);
        res.end('hello\n');
    }).listen(3000);