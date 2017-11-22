/**
 * Created by wenslow on 2017/6/23.
 */

'use strict';

//1. 连接数据库
const mongoose = require('mongoose');
const db = mongoose.connect('mongoose://localhost/tasks');

//断开数据库
// db.disconnect();

//2.注册 schema
const Schema = mongoose.Schema;
const Task = new Schema({
    project: String,
    description: String
});
mongoose.model('Task', Schema);

//3. 添加任务
const Task = mongoose.model('Task');
let task = new Task();
task.project = 'Bikeshed';
task.description = 'Paint the bikeshed red';
task.save((err)=>{
    if (err) throw err;
    console.log('Task saved');
});

//4.搜索文档
Task.find({'project': 'Bikeshed'}, (err, tasks)=>{
    for (let i = 0; i<tasks.length; i++){
        console.log('ID:', tasks[i]._id);
        console.log(tasks[i],description);
    }
});

//5.更新文档
Task.update({_id: '123'}, {description: 'Paint the bikeshed green.'}, {multi: false}, (err, rows_updated)=>{
    if (err) throw err;
    console.log('Updated');
});

//6. 删除文档
Task.findById('123', (err, task)=>{
    task.remove();
});