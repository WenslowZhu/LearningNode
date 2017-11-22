/**
 * Created by wenslow on 2017/7/9.
 */

'use strict';

// 引入Node的内置模块path，以及Express，Zippity-do-dah，和ForecastIO
const express = require('express');
const path = require('path');
const zipdb = require('zippity-do-dah');
const ForecastIo = require('forecastio');

const app = express();

//利用你的API密钥创建一个ForecastIO对象
const weather = new ForecastIo('be8d4b44792cab1f4085885f1ab4c9f7');

// 使用EJS作为视图引擎，然后把views作为视图文件夹
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

//当访问主页的时候,渲染index
app.get('/', (req, res)=>{
    res.render('index');
});

app.get(/^\/(\d{5})$/, (req, res, next)=>{
    //捕获特定的ZIP编码通过req.params[0]
    const zipcode = req.params[0];
    //通过ZIP编码获取地理位置
    const location = zipdb.zipcode(zipcode);
    //如果没有找到results的话则返回{}, 如果对象不为空则继续
    if (!location) {
        next();
        return;
    }

    const latitude = location.latitude;
    const longitude = location.longitude;

    weather.forecast(latitude, longitude, (err, data)=>{
        if (err) {
            next();
            return;
        }

        //通过Express的json方法,发送一个json数据
        res.json({
            zipcode: zipcode,
            temperature: data.currently.temperature
        });
    });
});

//如果没有匹配到路由则返回一个404错误
app.use((req, res)=>{
    res.status(404).send('404');
});

app.listen(3000);