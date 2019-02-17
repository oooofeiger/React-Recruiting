const express = require('express');
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

//定义文档模型
const User = mongoose.model('user', new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    }
}))

//操作数据库
//增
User.create({
    user: 'feiger',
    age: 18
},function(err, doc){
    if(err){
        console.log(err)
    }else{
        console.log(doc)
    }
})

//改
User.update({user: 'feiger'},{ $set: {age: 26}}, function(err, doc){
    if(!err) console.log(doc)
})

//删
// User.remove({age: 18},function(err, doc){
//     if(!err) console.log(doc)
// })

const app = express();


app.get('/data', function(req, res){
    //查
    User.find({}, function(err, doc){
        if(err){
            console.log(err)
        }else{
            res.json(doc)
        }
    })
    
})

app.listen(9093, function(){
    console.log('Node app start at port 9093')
})