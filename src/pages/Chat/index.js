import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import { getChatId } from '@/utils/tool';
import style from './style.less';

import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

const Item = List.Item;
const emoji = '❤ ☺ ☹ ☠ ✌ ☝ ✍ ♂ ♀️ ☂ ☕ ☘ ☀ ☁ ⚡ ❄ ☃ ☄ ♟ ⚓ ✈ ⌛ ⌚ ☎ ⌨ ✉ ✏ ✒ ✂ ⚒ ⚔ ⚙ ⚖ ⚗ ❣ ♨ ♠ ♥ ♦ ♣ ♿ ⚠ ☢ ☣ ↗ ➡ ↘ ↙ ↖ ↕ ↔ ↩ ↪ ⤴ ⤵ ⚛ ✡ ☸ ☯ ✝ ☦ ☪ ☮ ♈ ♉ ♋ ♌ ♾ ♻'
                    .split(' ').filter(v=>v).map(v=>({text: v}));

@connect(({chat, user})=>({chat, user:user.access.data}))
class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text: '',
            msg: [],
            userId: props.user._id,
            targetId: props.match.params.user,
            showEmoji: false
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
    
    handleSubmit = () => {
        const { user, chat, dispatch, match } = this.props;
        const from = user._id;
        const to = this.state.targetId;
        const msg = this.state.text;
        socket.emit('sendmsg',{from, to, msg});
        this.setState({text: ''})
    }

    handleKeyDown = (e) => {
        if(e.keyCode === 13){
            this.handleSubmit();
        }
        
    }

    openEmoji = () => {
        this.setState({
            showEmoji: !this.state.showEmoji
        },()=>{
            this.fixCarousel();
        })
    }

    fixCarousel = () => {
        //修复antd-mobile的Grid显示bug
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'));
        },0)
    }

    handleClickEmoji = (el) => {
        console.log(el);
        const { text } = this.state;
        this.setState({
            text: text+el.text
        })
    }


    render(){
        const { chat } = this.props;
        const { text, userId, targetId, showEmoji } = this.state;
        if(!chat.users[userId])return null;
        const chatId = getChatId(userId, targetId);
        const chatMsg = chat.chatMsg.filter(v=>v.chatId === chatId);

        return (
            <div onKeyDown={this.handleKeyDown}>
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
                            extra={
                                <div>
                                    <span  style={{height:'100%',lineHeight: '44px',paddingRight:'15px',display:'inline-block'}}  onClick={this.openEmoji}>❤</span>
                                    <span  style={{height:'100%',lineHeight: '44px'}}  onClick={this.handleSubmit}>发送</span>
                                </div>
                            }
                        ></InputItem>
                    </List>
                    {
                        showEmoji ? <Grid data={emoji} columnNum={7} carouselMaxRow={4} isCarousel={true} onClick={this.handleClickEmoji}/> : null
                    }
                    
                </div>
            </div>
            
        )
    }
}

export default Chat;
