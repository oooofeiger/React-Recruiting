const express = require('express');
const userRouter = require('./user');
const cookieParser = require('cookie-parser'); //解析cookie数据
const bodyParser = require('body-parser'); //解析post数据

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

app.listen(9093, function(){
    console.log('Node app start at port 9093')
})