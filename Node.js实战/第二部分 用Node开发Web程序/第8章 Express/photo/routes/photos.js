/**
 * Created by wenslow on 2017/6/24.
 */

'use strict';

const express = require('express');
const router = express.Router();

//引入模型
const Photo = require('../models/Photo');
const path = require('path');
const fs = require('fs');
const join = path.join();

/* GET photos page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    Photo.find({}, (err, photos)=>{
        if (err) return next(err);
        res.render('photos', {
            title: 'Photos',
            photos: photos
        })
    });
});

//上传的主页
router.get('/upload', (req, res, next)=>{
    res.render('photos/upload', {
        title: 'Photo upload'
    });
});

//上传文件
router.post('/upload', (dir)=>{

    return function (req, res, next) {
        //默认为原来的文件名
        const img = req.files.photo.image;
        const name = req.body.photo.name || img.name;
        const path = join(dir, img.name);

        console.log(req);

        //重命名文件
        fs.rename(img.path, path, (err)=>{
            if (err) return next(err);

            console.log('rename');

            Photo.create({
                name: name,
                path: img.name
            }, (err)=>{
                if (err) return next(err);
                res.redirect('/');
            });
        });
    };
});

//下载文件
router.get('/photo/:id/download', (dir)=>{
    return function (req, res, next) {
        const id = req.params.id;
        Photo.findById(id, function (err, photo) {
            if (err) return next(err);
            const path = join(dir, photo.path);
            res.sendFile(path);//传输文件
        })
    }
})

module.exports = router;

let photos = [];
photos.push({
    name: 'Node.js Logo',
    path: 'http://nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
    name: 'Ryan Speaking',
    path: 'http://nodejs.org/images/ryan-speaker.jpg'
});
