/**
 * Created by wenslow on 2017/7/8.
 */

'use strict';

const fs = require('fs');//引入Node的文件系统模块
const options = {encoding: 'utf-8'};

// 读取myfile.txt (并把byte解析为UTF-8)
fs.readFile('myfile1.txt', options, (err, data)=>{

    //处理任何读取文件时遇到的错误
    if (err) {
        console.error(err.message);
        return;
}
// 通过正则表达式打印X的个数
console.log(data.match(/x/gi).length + ' letter X\'s');
});

