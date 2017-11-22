/**
 * Created by wenslow on 2017/6/21.
 */
'use strict';

const http = require('http'),
    work = require('.lib/timetrack'),
    mysql = require('mysql');

//连接MySQL
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'myuser',
    password: 'mypassword',
    database: 'timetrack'
});

const server = http.createServer((req, res)=>{
    switch (req.method){
        case 'POST':
            switch (req.url){
                case '/':
                    work.add(db, req, res);
                    break;
                case '/archive':
                    work.archive(db, req, res);
                    break;
                case '/delete':
                    work.delete(db, req, res);
                    break;
            }
            break;
        case 'GET':
            switch (req.url){
                case '/':
                    work.show(db, res);
                    break;
                case '/archive':
                    work.showArchive(db, res);
                    break;
            }
            break
    }
});

//创建数据库表
db.query(
    'CREATE TABLE IF NOT EXISTS word ('
    + 'id INT(10) NOT NULL AUTO_INCREMENT, '
    + 'hours DECIMAL(5,2) DEFAULT 0, '
    + 'date DATE,'
    + 'archived INT(1) DEFAULT 1,'
    + 'description LONGTEXT,'
    + 'PRIMARY KEY{id})',
    (err)=>{
        if (err) throw err;
        console.log('Server started...');
        server.listen(3000, '127.0.0.1');
    }
);
