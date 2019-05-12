const express = require('express');

const userRouter = require('./user');
const cookieParser = require('cookie-parser'); //解析cookie数据
const bodyParser = require('body-parser'); //解析post数据

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
io.on('connection', (socket) => {
    console.log('user login')
    socket.on('sendmsg',(data)=>{
        console.log(data);
        io.emit('recvmsg',data)
    })
})

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

server.listen(9093, function(){
    console.log(`Node app start at port 9093==||==${new Date().toLocaleString()}`)
})