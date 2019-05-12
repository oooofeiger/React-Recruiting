import React from 'react';
import io from 'socket.io-client';
import { List, InputItem } from 'antd-mobile';
import style from './style.less';

const socket = io('ws://localhost:9093');

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text: '',
            msg: []
        }
    }

    componentDidMount(){
        socket.on('recvmsg', (data)=>{
            console.log(data.text);
            this.setState({
                msg: [...this.state.msg, data.text]
            })
        })
    }

    handleSubmit = () => {
        socket.emit('sendmsg',{text:this.state.text});
        this.setState({
            text: ''
        })
    }

    render(){
        const { match : {params:{user}} } = this.props;
        const { msg, text } = this.state;
        console.log(user);
        return (
            <div>
                <div>
                    {
                        msg.map((val,i)=>{
                            return <p key={i}>{val}</p>
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
                            extra={<span onClick={this.handleSubmit}>发送</span>}
                        ></InputItem>
                    </List>
                </div>
            </div>
            
        )
    }
}

export default Chat;
