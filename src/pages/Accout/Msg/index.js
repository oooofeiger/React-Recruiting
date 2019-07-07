import React from 'react';
import { connect } from 'dva';
import { List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;
@connect(({chat}) => ({chatMsg: chat.chatMsg}))
class Msg extends React.Component{


    render(){
        const { chatMsg } = this.props;
        let msgGroup = {};
        chatMsg.forEach(item => {
            msgGroup[item.chatId] = msgGroup[item.chatId] || [];
            msgGroup[item.chatId].push(item);
        });

        const chatList = chatMsg.length ? Object.values(msgGroup) : [];//将msgGroup中的value拿出来组成数组
        console.log(Object.values(msgGroup),'msg msgGroup')
        return(
            <div>
                <List>
                    <Item></Item>
                </List>
            </div>
        )
    }
}

export default Msg;