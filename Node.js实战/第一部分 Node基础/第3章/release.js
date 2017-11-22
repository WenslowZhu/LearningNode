/**
 * Created by wenslow on 2017/6/18.
 */
'use strict';

var events = require('events');
var net = require('net');
var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

//添加join事件的监听器，保存用户的client对象，以便程序可以将数据发送给用户
channel.on('join', function (id, client) {
    this.clients[id] = client;
    this.subscriptions[id] = function (senderId, message) {
        //忽略发出这一广播的用户
        if (id !== senderId){
            this.clients[id].write(message);
        }
    };
    //添加一个专门针对当前用户的broadcast输入事件监听器
    this.on('broadcast', this.subscriptions[id]);

    var number = this.listeners('broadcasr').length;
});

//移除监听
channel.on('leave', function (id) {
    channel.removeListener('broadcast', this.subscriptions[id]);
    channel.emit('broadcase', id, id + ' has left the chat.\n');
});

//移除所有监听
client.on('shutdown', function () {
    channel.emit('broadcast', '', 'Chat has shut down.\n');
    channel.removeAllListeners('broadcast');
})

var server = net.createServer(function (client) {
    var id = client.remoteAddress + ':' + client.remotePort;
    client.on('connect', function () {
        //当有用户连到服务器上来时发出一个join事件，指明用户ID和client对象
        channel.emit('join', id, client);
    });
    client.on('data', function (data) {
        data = data.toString();
        //监听关闭事件
        if (data === 'shutdown\r\n'){
            return channel.emit('shutdown');
        }
        //当有用户发送数据时，发出一个频道broadcast事件，指明用户ID和消息
        channel.emit('broadcast', id, data);
    });
    client.on('close', function () {
        channel.emit('leave', id);
    });
});
server.listen(8888);

//错误处理
var events = require('events');
var myEmitter = new events.EventEmitter();
myEmitter.on('error', function (err) {
    console.log('ERROR: ' + err.message);
});
myEmitter.emit('error', new Error('Something is wrong.'));