import React from 'react';
import { connect } from 'dva';
import { List, InputItem, NavBar } from 'antd-mobile';
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
            user: props.user._id
        }
    }

    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({
            type: 'chat/handleGetChatMsg'
        })
        socket.on('recvmsg',(data)=>{
            console.log('recvmsg',data); 
            dispatch({
                type: 'chat/handleRecvMsg',
                payload: {...data}
            })
        })

    }

    
    handleSubmit = () => {
        const { user, chat, dispatch, match } = this.props;
        const from = user._id;
        const to = match.params.user;
        const msg = this.state.text;
        socket.emit('sendmsg',{from, to, msg});
        this.setState({text: ''})
    }

    render(){
        const { chat } = this.props;
        const { text, user } = this.state;
        return (
            <div>
                <NavBar mode="dark">{user}</NavBar>
                <div className={style['chat-page']}>
                    {
                        chat && chat.chatMsg.map((val,i)=>{
                            return val.from !== user?(
                                <List key={i}>
                                    <Item
                                        thumb={""}
                                        
                                    >{val.content}</Item>
                                </List>
                            ):(
                                <List key={i}>
                                    <Item extra={'avatar'} className={style['chat-me']}>{val.content}</Item>
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
                            extra={<span  style={{display: 'block',height:'100%',lineHeight: '44px'}} onClick={this.handleSubmit}>发送</span>}
                        ></InputItem>
                    </List>
                </div>
            </div>
            
        )
    }
}

export default Chat;
