/**
 * Created by wenslow on 2017/11/24.
 */

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const textCensor = require('text-censor');

mongoose.Promise = Promise;

app.use(express.static(__dirname));//定义根目录
app.use(bodyParser.json());//自动解析json
app.use(bodyParser.urlencoded({extended: false}));//解析URL

const dbURI = 'mongodb://wenslow:welcome2ford@ds113826.mlab.com:13826/dbtest';

const Message = mongoose.model('Message', {
    name: String,
    message: String
});

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        if (err) {
            console.log(err);
        } else {
            res.send(messages);
        }
    });
});

app.get('/messages/:user', (req, res) => {
    //查找指定用户的消息
    const user = req.params.user;
    Message.find({name: user}, (err, messages) => {
        if (err) {
            console.log(err);
        } else {
            res.send(messages);
        }
    });
});

//socket链接被建立
io.on('connection', (socket) => {
    console.log('a user connected');

    //发送message数组
    socket.on('getMessage', () => {
        Message.find({}, (err, messages) => {
            if (err) {
                console.log(err);
                socket.emit('message', {'Find Error': 'Error'});
            } else {
                socket.emit('messagesArray', messages);
            }
        });
    });

    //接受网页发来的消息
    socket.on('postMessage', async (data) => {

        try {
            //保存数据到数据库
            let message = new Message(data);

            //检测敏感词
            const censoredName = await textCensor.filter(message.name);
            if (censoredName) {
                message.name = censoredName;
            }

            const censoredMessage = await textCensor.filter(message.message);
            if (censoredMessage) {
                message.message = censoredMessage;
            }

            const saveMessage = await message.save();
            console.log(`${saveMessage} saved`);

            io.emit('message', message);
        } catch (err) {
            socket.emit('message', {name: 'Error', message: 'Error'});
            return console.log(err);
        } finally {
            console.log('message post called');
        }
    });
});

mongoose.connect(dbURI, {useMongoClient: true}, (err) => {
    if (err) {
        console.log('mongo db connection', err);
    } else {
        console.log('mongo db connection is success');
    }
});

const server = http.listen(3000, (err, data)=>{
    if (err) {
        console.log(err);
    }
    else {
        console.log(`server is listening on port ${server.address().port}`);
    }
});