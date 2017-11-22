/**
 * Created by wenslow on 2017/6/18.
 */

'use strict';

function Watcher(watchDir, processedDir) {
    this.watchDir = watchDir;
    this.processedDir = processedDir;
}

var events = require('events');
// util.inherit(Watcher, events.EventEmitter);//集成另一个对象里的行为

//继承另一个对象里的行为
Watcher.prototype = new events.EventEmitter();

//添加两个新方法，扩展集成自EventEmitter的方法

var fs = require('fs'),
    watchDir = './watch',
    processedDir = './done';

//拓展EventEmitter添加处理文件的方法
Watcher.prototype.watch = function () {
    var watcher = this;//保存Watcher对象的引用，以便在回调函数readdir中使用
    fs.readdir(this.watchDir, function (err, files) {
        if (err) throw  err;

        for (var index in files){
            watcher.emit('process', files[index]);//处理watch目录中所有文件
        }
    });
};

//扩展EventEmitter，添加开始监测的方法
Watcher.prototype.start = function () {
    var watcher = this;
    fs.watchFile(watchDir, function () {
        watcher.watch();
    });
};

//定义好Watcher类之后，
var watcher = new Watcher(watchDir, processedDir);

watcher.on('process', function process(file) {
    var watchFile = this.watchDir + '/' + file;
    var processedFile = this.processedDir + '/' + file.toLowerCase();

    fs.rename(watchFile, processedFile, function (err) {
        if (err) throw err;
    });
});

watcher.start();