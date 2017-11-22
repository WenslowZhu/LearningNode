/**
 * Created by wenslow on 2017/6/21.
 */

'use strict';

//1 连接MongoDB
const mongodb = require('mongodb'),
    server = new mongodb.Server('127.0.0.1', 27017, {}),
    client = new mongodb.Db('mydatabase', server, {w: 1});

//2 访问MongoDB集合
client.open((err)=>{
    if (err) throw err;
    client.collection('test_insert', (err, collection)=>{
        if (err) throw err;
        // console.log('We are now able to perform queries');
        //将文档插入集合中
        collection.insert(
            {
                'title': 'I like cake',
                'body': 'It is quite good.'
            },
            {safe: true},
            (err, documents)=>{
                if (err) throw err;
                console.log('Document ID is: ' + documents[0]._id);
            }
        );
    });
});

//用文档ID更新数据
const _id = new client.bson_serializer.ObjectID('4e650d344ac74b5a01000001');
collection.update(
    {_id: _id},
    {$ser: {'title': 'I ate too much cake'}},
    {safe: true},
    (err)=>{
        if (err) throw err;
    }
);

//搜索文档
collection.find({'title': 'I like cake'}).toArray(
    (err, results) =>{
        if (err) throw err;
        console.log(results);
    }
);

//删除文档
const _id = new client.bson_serializer.ObjectID('4e650d344ac74b5a01000001');
collection.remove({_id: _id}, {safe: true}, (err)=>{
    if (err) throw err;
});






