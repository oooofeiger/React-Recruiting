const express = require('express');

const userRouter = require('./user');
const cookieParser = require('cookie-parser'); //解析cookie数据
const bodyParser = require('body-parser'); //解析post数据

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Model = require('./model');
const Chat = Model.getModel('chat');
io.on('connection', (socket) => {
    console.log('user login')
    socket.on('sendmsg',(data)=>{
        console.log(data);
        const { from, to, msg } = data;
        const chatId = [from, to].sort().join('_');
        Chat.create({chatId, from, to, content:msg}, function(err, doc){
            if(!err){
                console.log('保存消息成功',doc)
                io.emit('recvmsg', Object.assign({}, doc._doc))
            }
        })
    })
})

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

server.listen(9093, function(){
    console.log(`Node app start at port 9093==>${new Date().toLocaleString()}`)
})