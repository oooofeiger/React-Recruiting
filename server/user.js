const express = require('express');
const tool = require('./tool');
const Model = require('./model');

const Router = express.Router();
const User = Model.getModel('user');


Router.get('/list', function(req, res){
    User.remove({},function(err, doc){
    if(!err) console.log(doc)
})
    User.find({}, function(err,doc){
        return res.json(doc)
    })
})

Router.post('/register', function(req, res){
    const { user, pwd, type } = req.body;
    User.findOne({user}, function(err, doc){
        if(doc){
            return res.json({ code: 0, message: '用户名重复!'})
        }else if(err){
            console.log(err);
            return;
        }
        User.create({user, pwd: tool.md5(pwd), type}, function(err, doc){
            if(err){
                return res.json({ code: 0, message: '创建用户失败！'});
            }else{
                console.log('创建成功');
                return res.json({ code: 1, message: '注册成功'});
            }
            
        })

    })
})

Router.post('/login', function(req, res){
    const { user, pwd } = req.body;
    User.findOne({user, pwd: tool.md5(pwd)}, {pwd: 0}, function(err, doc){
        if(doc === null) return res.json({ code: 1, message: '用户名或密码输入不正确！'});
        if(doc){
            return res.json({code: 1, data: doc});
        }else if(err){
            return res.json({ code: 0, message: '数据查询失败'});
        }
    })
})












module.exports = Router;