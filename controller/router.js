let file = require('../models/file.js');
let formidable = require('formidable');
let fs = require('fs');
let path = require('path');
const sd = require('silly-datetime');
// 显示首页
exports.showIndex = function(req, res, next) {
    // res.render('index', {
    //     'albums': file.getAllAlbums()  // 因为file.getAllAlbums 是异步的。
    // });
    // 这就是node.js的编程思维 就是所有的东西 都是异步的
    // 所以, 内层函数不是return 回来东西 而是调用高层函数提供的
    // 回调函数。把数据当作回调函数的参数来使用
    file.getAllAlbums((err, allAlbums) => {
        if (err) {
            next();
            return;
        }
        res.render('index', {
            'albums': allAlbums
        })
    })
}
// 显示详情
exports.showAlbum = function(req, res, next) {
    let albumName = req.params['albumName'];
    file.getAllImages(albumName, (err, images) =>  {
        if (err) {
            next();
            return;
        }
        res.render('albums', {
            'albumName': albumName,
            'images': images
        })
    })
}

// 显示上传页
exports.showUp = function(req, res, next) {
    file.getAllAlbums((err, allAlbums) => {
        if (err) {
            next();
            return;
        }
        res.render('up', {
            'albums': allAlbums
        })
    })
}

// 处理上传图片
exports.doUpload = function(req, res, next) {
    let form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + '/../templateUp');
    form.parse(req, (err, fields, files, next) => {
        if (err) {
            next();
            return;
        }
        console.log(files);
        // 限制上传图片的大小
        const LIMIT = 1048576 * 10;
        if (files.image.size > LIMIT) {
            res.send('图片应该小于10MB');
            fs.unlink(files.image.path);
            return;
        }
        // 文件夹
        let wenjianjia = fields.wenjianjia
        // 时间戳
        let ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
        // 随机数
        let ran = parseInt(Math.random() * 89999 + 10000);
        // 扩展名
        let extname = path.extname(files.image.name).toLocaleLowerCase();
        // 旧路径
        let oldPath = files.image.path;
        // 新路径
        let newPath = path.normalize(__dirname + '/../uploads/' + wenjianjia + '/' + ttt + ran + extname);
        // 图片改名字 放到指定文件夹
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                res.send('文件不存在');
                return
            }
        })
        res.send('成功');
    });
}