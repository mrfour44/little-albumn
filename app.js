const express = require('express');
const app = express();
const router = require('./controller/router.js');
app.set('view engine', 'ejs');

// 路由中间件
// 静态页面
app.use(express.static('./public'));
app.use(express.static('./uploads'));

app.get('/', router.showIndex);
app.get('/:albumName', router.showAlbum);
app.get('/up', router.showUp);
app.post('/uploadImages', router.doUpload);
// 404 中间件
app.use((req, res) => {
    res.render('err');
})
app.listen(3000);