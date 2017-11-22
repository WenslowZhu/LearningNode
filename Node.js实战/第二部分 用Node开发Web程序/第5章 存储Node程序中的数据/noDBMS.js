/**
 * Created by wenslow on 2017/6/21.
 */
'use strict';

const fs = require('fs'),
    path = require('path'),
    args = process.argv.splice(2),//去掉‘node cli_tasks.js’，只留下参数
    command = args.shift(),//取出第一个参数（命令）
    taskDescription = args.join(' '),//合并剩余的参数
    file = path.join(process.cwd(), './tasks');//根据当前的工作目录解析数据库的相对路径

switch (command){
    case 'list':
        listTasks(file);
        break;
    case 'add':
        addTask(file, taskDescription);
        break
    default:
        console.log('Usage: ' + process.argv[0] + ' list|add [taskDescription]');
}

//获取任务的函数
function loadOrInitializeTaskArray(file, cb) {
    fs.exists(file, (exists)=>{
        if (exists){
            fs.readFile(file, 'utf8', (err, data)=>{
                if (err)throw err;
                const data = data.toString();
                const tasks = JSON.parse(data || '[]');//把用JSON编码的待办事项数据解析到任务数组中
                cb(tasks);
            });
        }else{
            cb([]);//如果.tasks文件不存在，则创建空的任务数组
        }
    });
}

//列出任务
function listTasks(file) {
    loadOrInitializeTaskArray(file, (tasks)=>{
        for (const i in tasks){
            console.log(tasks[i]);
        }
    });
}

//把任务存放到磁盘中
function storeTasks(file, tasks) {
    fs.writeFile(file, JSON.stringify(tasks), 'utf8', (err)=>{
        if (err) throw err;
        console.log('Saved');
    });
}

// 添加任务
function addTask(file, taskDescription) {
    loadOrInitializeTaskArray(file, (tasks)=>{
        storeTasks(file, tasks);
    });
}

//
// const http = require('http');
// let counter = 0;
//
// var server = http.createServer((req, res)=>{
//     counter++;
//     res.write('I have been accessed '+ counter + 'times');
//     res.end();
// }).listen(3000);