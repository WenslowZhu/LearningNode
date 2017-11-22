/**
 * Created by wenslow on 2017/7/8.
 */

'use strict';

const MAX = 100;

function randomInteger() {
    return Math.floor((Math.random() * MAX));
}

// module.exports = randomInteger;//暴露模块给其他文件
exports.ran = ()=>{
    return Math.floor((Math.random() * MAX));
};