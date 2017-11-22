/**
 * Created by wenslow on 2017/6/20.
 */
'use strict';

const http = require('http'),
    formidable = require('formidable');

let server = http.createServer((req, res)=>{
    switch (req.method){
        case 'GET':
            show(req, res);
            break;
        case 'POST':
            upload(req, res);
            break;
    }
});

server.listen(3000);

function show(req, res) {
    const html = ''
        + '<form method="post" action="/" enctype="multipart/form-data">'
        + '<p><input type="text" name="name"></p>'
        + '<p><input type="file" name="file"></p>'
        + '<p><input type="submit" name="Upload"></p>'
        + '</form>';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

function upload(req, res) {
    if (!isFormData(req)){
        res.statusCode = 400;
        res.end('Bad Requset: expecting multipart/form-data');
        return;
    }
    let form = new formidable.IncomingForm();
    // form.on('field', (field, value)=>{
    //     console.log(field);
    //     console.log(value);
    // });
    // form.on('file', (name, value)=>{
    //     console.log(name);
    //     console.log(value);
    // });
    // form.on('end', ()=>{
    //     res.end('upload complete');
    // });
    form.parse(req);
}

//检查请求头中的Content-Type字段
function isFormData(req) {
    const type = req.headers['Content-Type'] || '';
    return 0 === type.indexOf('multipart/form-data');
}