const express = require('express');
const tool = require('./tool');
const Model = require('./model');

const Router = express.Router();
const User = Model.getModel('user');
const Chat = Model.getModel('chat');

const _filter = { pwd: 0, _v: 0}; //过滤掉密码和版本号
// Chat.remove({},function(){})
Router.get('/list', function(req, res){
    // User.remove({},function(err, doc){
    //     if(!err) console.log(doc)
    // })
    const { type } = req.query;
    User.find({type}, _filter, function(err,doc){
        return res.json({code:1,data:doc})
    })
})

Router.get('/getMsg', function(req, res){
    const user = req.cookies.userid;
    console.log(req.cookies,'user');
    User.find({}, function(err, doc){
        let users = {};
        doc.forEach(item=>{
            users[item._id] = {name: item.user, avatar: item.avatar}
        })
        Chat.find({'$or':[{from: user, to: user}]}, function(err, doc){
            if(!err) {
                return res.json({code: 1, data: doc, users: users});
            }else {
                console.log('/getMsg:'+err)
            }
        })
    })
    
})

Router.post('/register', function(req, res){
    const { user, pwd, type } = req.body;
    User.findOne({user}, _filter, function(err, doc){
        if(doc){
            return res.json({ code: 0, message: '用户名重复!'})
        }else if(err){
            console.log(err);
            return;
        }
        User.create({user, pwd: tool.md5(pwd), type}, function(err, doc){
            if(err){
                return res.json({ code: 0, message: '创建用户失败！'});
            }
            if(doc){
                console.log(doc);
                const { user, type, _id} = doc;
                res.cookie('userid', _id);
                return res.json({ code: 1, message: '注册成功', data: {user, type, _id}});
            }
            
        })

    })
})

Router.post('/login', function(req, res){
    const { user, pwd } = req.body;
    User.findOne({user, pwd: tool.md5(pwd)}, _filter, function(err, doc){
        if(doc === null) return res.json({ code: 0, message: '用户名或密码输入不正确！'});
        if(doc){
            res.cookie('userid', doc._id);
            return res.json({code: 1, data: doc});
        }else if(err){
            return res.json({ code: 0, message: '数据查询失败'});
        }
    })
})

Router.get('/info', function(req, res){
    const { userid } = req.cookies;
    if(!userid){
        return res.json({code: 0})
    }
    User.findOne({_id: userid}, _filter, function(err, doc){
        if(err){
            return res.json({code: 0, message: '数据查询失败'})
        }
        if(doc){
            return res.json({code: 1, data: doc})
        }
    })
})

Router.post('/infoUpdate', function(req, res){
    const { userid } = req.cookies;
    if(!userid){
        return res.json({code: 0})
    }
    const body = req.body;
    User.findByIdAndUpdate(userid, body, function(err, doc){
        const data = {
            user: doc.user,
            type: doc.type,
            ...body
        };
        return res.json({code: 1, data})
    })
})











module.exports = Router;