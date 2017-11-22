/**
 * Created by wenslow on 2017/7/15.
 */

'use strict';

const express = require('express');
const User = require('./models/user');
const router = express.Router();

const passport = require('passport');

router.use((req, res, next)=>{
    //为模板设置几个有用的变量
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash('error');
    res.locals.infos = req.flash('info');
    next();
});

router.get('/', (req, res, next)=>{
    //查询用户集合, 并且总是先返回新的用户
    User.find()
        .sort({createdAt: 'descending'})
        .exec((err, users)=>{
        if (err) {return next(err);}

        res.render('index', {users: users});
    });
});


router.get('/signup', (req, res)=>{
    res.render('signup');
});

router.post('/signup', (req, res, next)=>{

    // body-parser把userName和password添加到req.body
    const username = req.body.username;
    const password = req.body.password;

    //调用findOne只返回一个用户.
    User.findOne({username: username}, (err, user)=>{
        if (err) {return next(err);}

        //如果找到一个用户, 则说明该用户名已被注册
        if (user) {
            req.flash('error', 'User already exists');//生成error
            return res.redirect('/signup');
        }

        //通过username和password创建一个User模型的实例
        const newUser = new User({
            username: username,
            password: password
        });
        //将新的用户保存到数据库中,然后继续下一个请求处理
        newUser.save(next);
    });
    // 用户有效型验证
}, passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}));

module.exports = router;