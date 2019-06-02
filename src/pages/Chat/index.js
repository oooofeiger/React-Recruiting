import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { List, InputItem, NavBar, Icon } from 'antd-mobile';
import { getChatId } from '@/utils/tool';
import style from './style.less';

import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

const Item = List.Item;
@connect(({chat, user})=>({chat, user:user.access.data}))
class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text: '',
            msg: [],
            userId: props.user._id,
            targetId: props.match.params.user
        }
    }

    componentDidMount(){
        const { dispatch, chat } = this.props;
        const { userId } = this.state;
        if(chat.chatMsg.length) return;
        dispatch({
            type: 'chat/handleGetChatMsg',
            payload: {userid: userId}
        })
        socket.on('recvmsg',(data)=>{
            console.log('recvmsg_chat',data); 
            dispatch({
                type: 'chat/handleRecvMsg',
                payload: {...data, userid: userId}
            })
        })
    
    }


      //todo: 重复监听recvmsg，一次发送产生三次聊天记录
    
    handleSubmit = () => {
        const { user, chat, dispatch, match } = this.props;
        const from = user._id;
        const to = this.state.targetId;
        const msg = this.state.text;
        socket.emit('sendmsg',{from, to, msg});
        this.setState({text: ''})
    }

    handleKeyDown = (e) => {
        console.log(e)
    }



    render(){
        const { chat } = this.props;
        const { text, userId, targetId } = this.state;
        if(!chat.users[userId])return null;
        const chatId = getChatId(userId, targetId);
        const chatMsg = chat.chatMsg.filter(v=>v.chatId === chatId)
        return (
            <div>
                <NavBar 
                    mode="dark"
                    icon={<Icon type="left"/>}
                    onLeftClick={()=>{
                        router.goBack();
                    }}
                >
                    {chat.users[targetId].name}
                </NavBar>
                <div className={style['chat-page']}>
                    {
                        chatMsg.map((val,i)=>{
                            const avatar = require(`../../assets/images/${chat.users[val.from].avatar}.png`);
                            return val.from !== userId?(
                                <List key={i}>
                                    <Item
                                        thumb={avatar}
                                        
                                    >{val.content}</Item>
                                </List>
                            ):(
                                <List key={i}>
                                    <Item extra={<img src={avatar} alt=""/>} className={style['chat-me']}>{val.content}</Item>
                                </List>
                            )
                        })
                    }
                </div>
                <div className={style.stickFooter}>
                    <List>
                        <InputItem
                            palceholder="请输入"
                            value={text}
                            onChange={(val)=>{
                                this.setState({
                                    text: val
                                })
                            }}
                            extra={<span  style={{display: 'block',height:'100%',lineHeight: '44px'}} onKeyDown={this.handleKeyDown} onClick={this.handleSubmit}>发送</span>}
                        ></InputItem>
                    </List>
                </div>
            </div>
            
        )
    }
}

export default Chat;
