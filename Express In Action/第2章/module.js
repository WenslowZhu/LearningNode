/**
 * Created by wenslow on 2017/7/8.
 */

'use strict';

//引入Node的url模块
const url = require('url');//引入一个url模块并将它存放到变量url中
const parsedURL = url.parse("http://www.example.com/rofile?name=barry");//使用url模块的parse函数

console.log(parsedURL.protocol);// "http:"
console.log(parsedURL.hostname);// "www.example.com"
console.log(parsedURL.query);// "name=barry"