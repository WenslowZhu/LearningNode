/**
 * Created by wenslow on 2017/6/24.
 */
'use strict';

const parse = require('url').parse;
module.exports = function route(obj) {
    return function (req, res, next) {
        //检查确保定义了req.method
        if (!obj[req.method]){
            next();
            return;
        }
        const routes = obj[req.method];//查找req.method对应的路径
        const url = parse(req.url);//解析URL，以便更pathName匹配
        const paths = Object.keys(routes);//将req.method对应的路径存放到数组中

        for (let i = 0; i<paths.length; i++){
            let path = paths[i];
            const fn = routes[path];
            path = path.replace(/\//g, '\\/').replace(/:(w+)/g, '([^\\/]+)');
            const re = new RegExp('^' + path + '$');//构造正则表达式
            const capture = usl.pathname.match(re);
            if (capture){
                const args = [req, res.concat(capture.slice(1))];
                fn.apply(numm, args);
                return
            }
            next()
        }
    };
};