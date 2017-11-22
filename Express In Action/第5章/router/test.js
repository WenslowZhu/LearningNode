/**
 * Created by wenslow on 2017/7/9.
 */

'use strict';

const express = require('express');
const app = express();

// 匹配传入的请求，如：/users/123，/users/horse_ebooks
app.get('/users/:userid', (req, res)=>{
    // 将userId转换为整型
    const userId = parsetInt(req.params.userid, 10);
});