// import * as express from 'express';
// import * as bodyParser from 'body-parser';
// import * as http from 'http';
// import * as io from 'socket.io';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var textCensor = require('text-censor');
mongoose.Promise = Promise;
app.use(express.static(__dirname)); //定义根目录
app.use(bodyParser.json()); //自动解析json
app.use(bodyParser.urlencoded({ extended: false })); //解析URL
var dbURI = 'mongodb://wenslow:welcome2ford@ds113826.mlab.com:13826/dbtest';
var Message = mongoose.model('Message', {
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
    socket.on('postMessage', function (data) { return __awaiter(_this, void 0, void 0, function () {
        var message, saveMessage, censoredName, censored, censoredMessage, censored, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, 11, 12]);
                    message = new Message(data);
                    return [4 /*yield*/, message.save()];
                case 1:
                    saveMessage = _a.sent();
                    console.log(saveMessage + " saved");
                    return [4 /*yield*/, textCensor.filter(message.name)];
                case 2:
                    censoredName = _a.sent();
                    if (!censoredName) return [3 /*break*/, 5];
                    message.name = censoredName;
                    return [4 /*yield*/, Message.findOne({ name: message.name })];
                case 3:
                    censored = _a.sent();
                    if (!censored) return [3 /*break*/, 5];
                    console.log('cencored word found', censored);
                    return [4 /*yield*/, Message.remove({ _id: censored.id })];
                case 4:
                    _a.sent();
                    console.log(censored + " removed success");
                    _a.label = 5;
                case 5: return [4 /*yield*/, textCensor.filter(message.message)];
                case 6:
                    censoredMessage = _a.sent();
                    if (!censoredMessage) return [3 /*break*/, 9];
                    message.message = censoredMessage;
                    return [4 /*yield*/, Message.findOne({ message: message.message })];
                case 7:
                    censored = _a.sent();
                    if (!censored) return [3 /*break*/, 9];
                    console.log('cencored word found', censored);
                    return [4 /*yield*/, Message.remove({ _id: censored.id })];
                case 8:
                    _a.sent();
                    console.log(censored + " removed success");
                    _a.label = 9;
                case 9:
                    io.emit('message', message);
                    return [3 /*break*/, 12];
                case 10:
                    err_1 = _a.sent();
                    socket.emit('message', { name: 'Error', message: 'Error' });
                    return [2 /*return*/, console.log(err_1)];
                case 11:
                    console.log('message post called');
                    return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    }); });
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
