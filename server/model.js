const mongoose = require('mongoose');
//连接数据库
const DB_URL = 'mongodb://localhost:27017/imooc';
mongoose.connect(DB_URL,{ useNewUrlParser: true });
mongoose.connection.on('connected', function(err){
    if(err){
        console.log(err)
    }else{
        console.log('mongo connect success');
    }
})