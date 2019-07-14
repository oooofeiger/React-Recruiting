import React from 'react';
import { connect } from 'dva';
import { List, Badge } from 'antd-mobile';
import router from 'umi/router';

const Item = List.Item;
const Brief = Item.Brief;
@connect(({chat,user}) => ({chatMsg: chat.chatMsg,users:chat.users,user: user.access.data}))
class Msg extends React.Component{
    constructor(props){
        super(props);
        this.getLastMsg = this.getLastMsg.bind(this);
    }

    getLastMsg = (v) => {
        return v[v.length-1]
    }  
    
    handleClickItem = (id) => {
        router.push(`/chat/${id}`)
    }


    render(){
        // users：聊天的用户数组， user：当前用户数据
        const { chatMsg, users, user } = this.props;
        let msgGroup = {};
        chatMsg.forEach(item => {
            msgGroup[item.chatId] = msgGroup[item.chatId] || [];
            msgGroup[item.chatId].push(item);
        });

        let chatList = chatMsg.length ? Object.values(msgGroup) : [];//将msgGroup中的value拿出来组成数组
        //最新的消息排在最上面
        chatList.sort((a,b)=>{   
            const a_last = this.getLastMsg(a).createTime;
            const b_last = this.getLastMsg(b).createTime;
            return b_last - a_last
        })
        console.log(Object.values(msgGroup),'msg msgGroup')
        //按照聊天用户分组根据chartId
        return(
            <div>
                
                    {
                        chatList.length && chatList.map((v,k)=>{
                            const lastMsg = this.getLastMsg(v); //获取最新的一条消息
                            const targetId = lastMsg.from === user._id ? lastMsg.to : lastMsg.from; // 跟当前的用户id比较，不相等的就是跟用户聊天的人
                            const unreadNum = v.filter(k=>!k.read && k.to === user._id).length;
                            return <List key={k}>
                            <Item 
                                thumb={require(`../../../assets/images/${users[targetId].avatar}.png`)}
                                extra={<Badge text={unreadNum}></Badge> }
                                onClick={this.handleClickItem.bind(this,targetId)}
                            >
                                {lastMsg.content}
                                <Brief>{users[targetId].name}</Brief>
                            </Item></List>
                        })
                    }
                    
                
            </div>
        )
    }
}

export default Msg;