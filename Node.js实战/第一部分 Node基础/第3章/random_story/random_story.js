/**
 * Created by wenslow on 2017/6/18.
 */

'use strict';

var fs = require('fs'),
    request = require('request'),
    htmlparser = require('htmlparser'),
    configFilename = './rss_feeds.txt';

//任务1： 确保包含RSS预定源URL列表的文件存在
function checkForRSSFile() {
    fs.exists(configFilename, function (exists) {
        if (!exists)
            //有错误就尽早返回
            return next(new Error('Missing RSS file: ' + configFilename));
        next(null, configFilename);
    });
}

function readRSSFile(configFilename) {
    fs.readFile(configFilename, function (err, feedList) {
        if (err) return next(err);

        //从预定源URL列表转换成字符串，然后分隔成一个数组
        feedList = feedList.toString().replace(/^\s+|\s+$/g, '').split('\n');
        var random = Math.floor(Math.random()*feedList.length);
        next(null, feedList[random]);
    });
}

function downloadRSSFeed(feedUrl) {
    request({uri: feedUrl}, function (err, res, body) {
        if (err) return next(err);
        if (res.statusCode !== 200){
            return next(new Error('Abnormal response status code'));
        }
        next(null, body);
    });
}

function parseRSSFeed(rss) {
    var handler = new htmlparser.RssHandler();
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);

    if (!handler.dom.items.length){
        return next(new Error('No RSS items found'));
    }

    var item = handler.dom.items.shift();
    console.log(item.title);
    console.log(item.link);
}

//把所有要做的任务按照执行顺序添加到一个数组中
var tasks = [
    checkForRSSFile,
    readRSSFile,
    downloadRSSFeed,
    parseRSSFeed
];

//负责执行任务的next函数
function next(err, result) {
    if (err) throw err;
    var currentTask = tasks.shift();//从数组中取出下一个任务
    if (currentTask){
        currentTask(result);
    }
}

next();


