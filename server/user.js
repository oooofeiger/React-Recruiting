const express = require('express');
const Model = require('./model');

const Router = express.Router();
const User = Model.getModel('user');


Router.get('/list', function(req, res){
    User.find({}, function(err,doc){
        return res.json(doc)
    })
})

Router.post('/register', function(req, res){
    const { user, pwd, type } = req.body;
    User.findOne({user}, function(err, doc){
        if(doc){
            return res.json({success: true, message: '用户名重复!'})
        }else if(err){
            console.log(err)
        }
        User.create({user, pwd, type}, function(err, doc){
            if(err){
                return res.json({success: true, message: '创建用户失败！'})
            }
            return res.json({success: false})
        })

    })
})












module.exports = Router;