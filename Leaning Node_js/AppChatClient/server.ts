// import * as express from 'express';
// import * as bodyParser from 'body-parser';
// import * as http from 'http';
// import * as io from 'socket.io';

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

// let messages = [
//     {name: 'Tim', message: 'Hi'},
//     {name: 'Jane', message: 'Hello'}
// ];

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

            const saveMessage = await message.save();

            console.log(`${saveMessage} saved`);

            const censoredName = await textCensor.filter(message.name);
            if (censoredName) {
                message.name = censoredName;

                const censored = await Message.findOne({name: message.name});
                if (censored) {
                    console.log('cencored word found', censored);
                    await Message.remove({_id: censored.id});
                    console.log(`${censored} removed success`);
                }
            }

            const censoredMessage = await textCensor.filter(message.message);
            if (censoredMessage) {
                message.message = censoredMessage;

                const censored = await Message.findOne({message: message.message});
                if (censored) {
                    console.log('cencored word found', censored);
                    await Message.remove({_id: censored.id});
                    console.log(`${censored} removed success`);
                }
            }

            io.emit('message', message);
        } catch (err) {
            socket.emit('message', {name: 'Error', message: 'Error'});
            return console.log(err);
        } finally {
            console.log('message post called');
        }
    });
});



//
// Message.findOne({message: 'badword'}, (err, censored) => {
//     if (censored) {
//         npmconsole.log('cencored word found', censored);
//         Message.remove({_id: censored.id}, (err) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log('removed censored message');
//             }
//         });
//     }
// });
// // messages.push(data);
// io.emit('message', data);

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