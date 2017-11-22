/**
 * Created by wenslow on 2017/7/15.
 */

'use strict';

const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const SALT_FACTOR = 10;

const userSchema = mongoose.Schema({
    userName: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    createdAt: {type: Date, default: Date.now()},
    displayName: String,
    bio: String
});

//获取用户名
userSchema.methods.name = ()=>{
    return this.displayName || this.name;
};

//一个用于提供给用户bcrypt模块空函数
const noop = function () {};

//定义一个在模型保存前运行的函数
userSchema.pre('save', function(done) {
    //存储当前用户的引用
    const user = this;

    //如果密码没有被修改过的话跳过处理逻辑
    if (!user.isModified('password')) {
        return done();
    }

    //根据salt生成对应的散列, 一旦完成则调用内部函数
    bcrypt.genSalt(SALT_FACTOR, (err, salt)=>{
        if (err) {return done(err);}
        bcrypt.hash(user.password, salt, noop, (err, hashedPassword)=>{
            if (err) {return done(err);}
            user.password = hashedPassword;
            done();
        });
    });
});

//MARK: 检测密码
userSchema.methods.checkPassword = (guess, done)=>{
    bcrypt.compare(guess, this.password, (err, isMathch)=>{
        done(err, isMathch);
    });
};

//创建并暴露用户模型
const  User = mongoose.model('User', userSchema);
module.exports = User;