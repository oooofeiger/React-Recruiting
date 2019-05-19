const mongoose = require('mongoose');
//连接数据库
const DB_URL = 'mongodb://localhost:27017/imooc-chart';
mongoose.connect(DB_URL,{ useNewUrlParser: true });
mongoose.connection.on('connected', function(err){
    if(err){
        console.log(err)
    }else{
        console.log('mongo connect success');
    }
})

const models = {
    user: {
        user: {type: String, require: true},
        pwd: { type: String, require: true},
        type: { type: String, require: true},
        //头像
        avatar: { type: String},
        //个人简介
        desc: { type: String},
        //职位名
        job: { type: String},
        //如果是boss
        company: { type: String},
        money: { type: String}
    },
    chat: {
        chatId: { type: String, require: true},
        from: { type: String, require: true},
        to: { type: String, require: true},
        content: { type: String, require: true},
        createTime: { type: Number, default: new Date().getTime()},
        read: { type: Boolean, default: false}
    }
}


for(let i in models){
    mongoose.model(i, new mongoose.Schema(models[i]))
}


module.exports = {
    getModel: function(name){
        return mongoose.model(name)
    }
}

