/**
 * Created by wenslow on 2017/7/9.
 */

'use strict';

//引入需要的模块
const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

//创建Express app
const app = express();

// 第一行告诉Express视图存在一个views文件中
// 下一行表明视图将使用EJS引擎
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

//创建一个全局的数组,用于存储所有条目
let entries = [];
//使这个条目数组可以子啊所有视图中访问
app.locals.entries = entries;

//使用Morgan来记录每次request请求
app.use(logger('dev'));

//填充一个req.body变量,如果用户提交了表单的话(扩展项是必须的)
app.use(bodyParser.urlencoded({extended: false}));

//访问了网址根目录,就渲染主页(位于views/index.ejs)
app.get('/', (req, res)=>{
    res.render('index');
});

//渲染 '新条目' 页面(位于 views/index.ejs) 当get访问这个URL的时候
app.get('/new-entry', (req, res)=>{
    res.render('new-entry');
});

//定义一个路由处理, 当你post到'new-entry'这个URL的时候与GET形成一个鲜明的对比
app.post('/new-entry', (req, res)=>{
    //如果用户提交的表单没有标题或者内容,则返回400的错误
    if (!req.body.title || !req.body.body) {
        res.status(400).send('Entries must have title and a body');
        return;
    }

    //添加一个新的条目到entries
    entries.push({
        title: req.body.title,
        content: req.body.body,
        published: new Date()
    });

    //重定向到主页来查看你的新条目
    res.redirect('/');
});

//渲染404页面,因为你请求了位置资源
app.use((req, res)=>{
    res.status(404).render('404\n');
});

//在3000端口启动服务器
app.listen(3000, ()=>{
    console.log('Guestbook app started on port 3000.\n');
});