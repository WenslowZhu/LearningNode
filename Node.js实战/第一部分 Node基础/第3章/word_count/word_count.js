/**
 * Created by wenslow on 2017/6/19.
 */

'use strict';

var fs = require('fs'),
    completedTasks = 0,
    tasks = [],
    wordCounts = {},
    fileDir = './text';


function checkIfComplete() {
    completedTasks++;
    //当所有任务完成后，列出文件中用到的每个单词以及用了多少次
    if (completedTasks === tasks.length){
        for (var index in wordCounts){
            console.log(index + ": " + wordCounts[index]);
        }
    }
}

function countWordsInText(text) {
    var words = text.toString().toLowerCase().split(/\W+/).sort();
    for (var index in words){
        var word = words[index];
        //对文本中的单词进行计数
        if (word){
            wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
        }
    }
}

fs.readdir(fileDir, function (err, files) {
    if (err) throw err;
    //得到text目录中的文件列表
    for (var index in files){
        //定义处理每个文件任务。每个任务中都会有一个异步读取文件的函数并对文件中使用的单词计数
        var task = (function (file) {
            return function () {
                fs.readFile(file, function (err, text) {
                    if (err) throw err;
                    countWordsInText(text);
                    checkIfComplete();
                });
            };
        })(fileDir + '/' + files[index]);
        tasks.push(task);//把所有任务都添加到函数调用数组中
    }
    for (var task in tasks){
        tasks[task]();//开始并行执行所有任务
    };
});