/**
 * Created by wenslow on 2017/6/18.
 */
'use strict';

var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

exports.listen = function (server) {

    //启动Socket.IO服务器，允许他搭载已有的HTTP服务器上
    io = socketio.listen(server);

    io.set('log level', 1);

    //定义没有用户连接的处理逻辑
    io.sockets.on('connection', function (socket) {
        //在用户连接上来时赋予某一个访客名
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
        //在用户链接上来时把他放入聊天室Lobby
        joinRoom(socket, 'Lobby');
        //处理用户的消息，更名，以及聊天室的创建和变更
        handleMessageBroadcasting(socket);
        handleNameChangeAttemps(socket, nickNames, namesUsed);
        handleRoonJoining(socket);

        //用户发出请求时，向其提供已经被占用的聊天室的列表
        socket.on('rooms', function () {
            socket.emit('rooms', io.sockets.manager.rooms);
        });

        //定义用户断开连接后的清除逻辑
        handleClientDisconnetion(socket, nickNames, namesUsed);
    })
}

/**
 * 分配昵称
 * @param socket
 * @param guestNumber
 * @param nickName
 * @param namesUsed
 * @returns {*}
 */
function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
    //生成新昵称
    var name = 'Guest' + guestNumber;
    //把用户昵称跟客户端连接ID关联上
    nickNames[socket.id] = name;
    //让用户知道他们的昵称
    socket.emit('nameResult', {
        success: true,
        name: name
    });
    //存放已经被占用的昵称
    namesUsed.push(name);
    //增加用来生成昵称的计数器
    return guestNumber + 1;
}

/**
 * 进入聊天室的相关逻辑
 * @param socket
 * @param room
 */
function joinRoom(socket, room) {
    socket.join(room); //让用户进入房间
    currentRoom[socket.id] = room;//记录用户当前的房间
    socket.emit('joinResult', {room: room});//让用户知道他们进入了新房间
    socket.broadcast.to(room).emit('message',{
        text: nickNames[socket.id] + ' has joined ' + room + '.'
    });//让房间里其他用户知道有新用户进入房间

    //确定有哪些用户在这个房间里
    var usersInRoom = io.sockets.clients(room);
    //如果不之一个用户在这个房间里，汇总下都是谁
    if (usersInRoom.length > 1){
        var usersInRoomSummary = 'User currently in ' + room + ': ';
        for (var index in usersInRoom){
            var userSocketId = usersInRoom[index].id;
            if (userSocketId != socket.id){
                if (index > 0){
                    usersInRoomSummary += ', ';
                }
                usersInRoomSummary += nickName[userSocketId];
            }
        }
        usersInRoomSummary += '. ';
        //将房间里其他用户的汇总发送给这个用户
        socket.emit('message', {text: usersInRoomSummary});
    }
}

/**
 * 更改昵称的逻辑
 * @param socket
 * @param nickName
 * @param namesUsed
 */
function handleNameChangeAttemps(socket, nickName, namesUsed) {
    //添加nameAttempt时间监听器
    socket.on('nameAttempt', function (name) {
        //昵称不能已Guest开头
        if (name.indexOf('Guest') == 0){
            socket.emit('nameResult', {
                success: false,
                message: 'Name cannot be begin with "Guest".'
            });
        }else{
            if (namesUsed.indexOf(name) == -1){
                //如果昵称还没注册就注册上
                var previousName = nickName[socket.id];
                var previousNameIndex = namesUsed.indexOf(previousName);
                namesUsed.push(name);
                nickNames[socket.id] = name;
                delete namesUsed[previousNameIndex];//删掉之前用的昵称，让其他用户可以使用
                socket.emit('nameResult',{
                    success: true,
                    name: name
                });
                socket.broadcast.to(currentRoom[socket.id]).emit('message', {
                    text: previousName + ' is now known as ' + name + '.'
                });
            }else{
                //如果昵称已经被占用，给客户端发送错误消息
                socket.emit('nameResult', {
                    success: false,
                    message: 'That name is already in use.'
                })
            }
        }
    });
}

/**
 * 发送聊天消息
 * @param socket
 */
function handleMessageBroadcasting(socket) {
    socket.on('message', function (message) {
        socket.boradcast.to(message.room).emit('message', {
            text: nickNames[socket.id] + ': ' + message.text
        });
    });
}

/**
 * 创建新的房间
 * @param socket
 */
function handleRoonJoining(socket) {
    socket.on('join', function (room) {
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket,room.newRoom);
    });
}

/**
 * 用户断开连接
 * @param socket
 */
function handleClientDisconnetion(socket) {
    socket.on('disconnect', function () {
        //删除昵称
        var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
        delete namesUsed[nameIndex];
        delete nickNames[socket.id];
    })
}