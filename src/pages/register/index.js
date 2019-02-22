import React from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile';
import { connect } from 'dva';
import styles from './style.less';
import Logo from '@/components/logo';

const RadioItem = Radio.RadioItem;

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type: 'genius',
        }
        this.register = this.register.bind(this);
    }

    register = () => {
        this.props.history.push('/login')
    }
    

    render(){
        const { type } = this.state;
        return (
            <div>
                <Logo />
                <h2>注册页</h2>
                <List>
                    <InputItem>用户名</InputItem>
                    <InputItem>密码</InputItem>
                    <InputItem>确认密码</InputItem>
                    <RadioItem checked={type==='genius'}>牛人</RadioItem>
                    <RadioItem checked={type==='boss'}>BOSS</RadioItem>
                </List>
                <WingBlank>
                    <Button type="primary">登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register