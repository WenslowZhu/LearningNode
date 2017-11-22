// import * as express from 'express';
// import * as bodyParser from 'body-parser';
// import * as http from 'http';
// import * as io from 'socket.io';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
app.use(express.static(__dirname)); //定义根目录
app.use(bodyParser.json()); //自动解析json
app.use(bodyParser.urlencoded({ extended: false })); //解析URL
var dbURI = 'mongodb://wenslow:welcome2ford@ds113826.mlab.com:13826/dbtest';
var Message = mongoose.model('Message', {
    name: String,
    message: String
});
var messages = [
    { name: 'Tim', message: 'Hi' },
    { name: 'Jane', message: 'Hello' }
];
// app.get('/messages', (req, res) => {
//     res.send(messages);
// });
// app.post('/messages', (req, res) => {
//     console.log(req.body);
//     messages.push(req.body);
//     io.emit('message', req.body);
//     res.sendStatus(200);
// });
//socket链接被建立
io.on('connection', function (socket) {
    console.log('a user connected');
    //发送message数组
    socket.on('getMessage', function () {
        Message.find({}, function (err, messages) {
            if (err) {
                console.log(err);
                socket.emit('message', { 'Find Error': 'Error' });
            }
            else {
                socket.emit('messagesArray', messages);
            }
        });
    });
    //接受网页发来的消息
    socket.on('postMessage', function (data) {
        //保存数据到数据库
        var message = new Message(data);
        message.save(function (err) {
            if (err) {
                console.log(err);
                socket.emit('message', { 'Save Error': 'Error' });
            }
            else {
                // messages.push(data);
                socket.emit('message', data);
            }
        });
    });
});
mongoose.connect(dbURI, { useMongoClient: true }, function (err) {
    if (err) {
        console.log('mongo db connection', err);
    }
    else {
        console.log('mongo db connection is success');
    }
});
var server = http.listen(3000, function (err, data) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("server is listening on port " + server.address().port);
    }
});
