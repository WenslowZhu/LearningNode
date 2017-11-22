/**
 * Created by wenslow on 2017/6/21.
 */
'use strict';

const qs = require('querystring');

let html = '';

//发送HTML响应
exports.sendHTML = function (res, html) {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
};

//解析HTTP POST数据
exports.parseReceivedData = function (req, cb) {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', (chunk)=>{
        body += chunk;
    });
    req.on('end', ()=>{
        const data = qs.parse(body);
        cb(data);
    });
};

//渲染简单的表单
exports.actionForm = function (id, path, label) {
    html = '<form method="post" action="' + path + '">'
    + '<input type="hidden" name="id" value="' + id + '">'
    + '<input type="submit" value="' + label + '">'
    + '</form>';
    return html;
};

//用MySQL添加数据
exports.add = function (db, req, res) {
    //解析HTTP POST数据
    exports.parseReceivedData(req, (work)=>{
        //添加工作记录的SQL
        db.query(
            "INSERT INTO work (hours, date, description) " + "VALUES (?, ?, ?)",
                [work.hours, work.date, work.description],//工作记录数据
                (err)=>{
                if (err) throw err;
                exports.show(db, res);//给用户显示工作记录清单
                }
        );
    });
};

//删除工作记录
exports.delete = (db, req, res)=>{
    exports.parseReceivedData(req, (work)=>{
        db.query(
            'DELETE FROM work WHERE id=?',
            [work.id],//工作记录ID
            (err)=>{
                if (err) throw err;
                exports.show(db, res);
            }
        );
    });
};

//更新MySQL数据
exports.archive = (db, req, res)=>{
    exports.parseReceivedData(req, (work)=>{
        db.query(
            'UPDATE work SET archived=1 WHERE id=?',
            [work.id],
            (err)=>{
                if (err) throw err;
                exports.show(db, res);
            }
        );
    });
} ;

//获取MySQL数据
exports.show = (db, res, showArchived)=>{
    var query = 'SELECT * FROM work' +
            'WHERE archived=? ' +
            'ORDER BY date DESC';
    var archiveValue = (showArchived)? 1: 0;
    db.query(
        query,
        [archiveValue],
        (err, rows) =>{
            if (err) throw err;
            html = (showArchived)? '': '<a href="/archived">Archived Work</a><br/>'
            // html += exports.work
        }
    )
}