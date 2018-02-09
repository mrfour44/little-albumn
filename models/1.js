// 错误
res.render('index', {
    name: student.getDetailById(123456).name
})

// 正确
student.getDetailById(123456, function(detail) {
    res.render('index', {
        name: detail.name
    })
})