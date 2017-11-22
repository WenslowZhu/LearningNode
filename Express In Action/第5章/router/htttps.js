/**
 * Created by wenslow on 2017/7/9.
 */

'use strict';

const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

//定义一个对象来保存证书和私钥
const httpsOptions = {
    key: fs.readdirSync("path/to/private/key.pem"),
    cert: fs.readdirSync("path/to/certificate.pem")
};

https.createServer(httpsOptions, app).listen(3000);