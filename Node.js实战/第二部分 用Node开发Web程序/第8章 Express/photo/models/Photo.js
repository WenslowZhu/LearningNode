/**
 * Created by wenslow on 2017/6/24.
 */
'use strict';

var mongoose = require('mongoose');

//建立在localhost上mongodb的连接，用photo_app做数据库
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', (err)=>{
    console.log(err);
});

db.once('open', ()=>{
    console.log('Connect success');
});

const schema = new mongoose.Schema({
    name: String,
    path: String
});

module.exports = mongoose.model('Photo', schema);
