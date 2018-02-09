const fs = require('fs');

// 获取uploads下的全部文件夹
exports.getAllAlbums = function(callback) {
    fs.readdir('./uploads', (err, files) => {
        if (err) {
            callback('没有找到uploads文件', null);
            return;
        }
        let allAlbums = [];
        (function iterator(i){
            if (i == files.length) {
                callback(null, allAlbums);
                return;
            }
            fs.stat('./uploads/' + files[i], (err, stats) => {
                if (err) {
                    callback('没有找到' + files[i], null)
                    return;
                }
                if(stats.isDirectory()) {
                    allAlbums.push(files[i]);
                }
                iterator(i + 1);
            })
        })(0)
    })
}

// 获取所有图片
exports.getAllImages = function(albumName, callback) {
    fs.readdir('./uploads/' + albumName, (err, files) => {
        if (err) {
            callback('没有找到uploads文件', null);
            return;
        }
        let images = [];
        (function iterator(i) {
            if (i == files.length) {
                callback(null, images);
                return;
            }
            fs.stat('./uploads/' + albumName + '/' + files[i], (err, stats) => {
                if (err) {
                    callback('没有找到' + files[i], null);
                    return;
                }
                if (stats.isFile()) {
                    images.push(files[i]);
                }
                iterator(i + 1);
            })
        })(0)
    })
}