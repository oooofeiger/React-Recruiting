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
        this.selectType = this.selectType.bind(this);
    }

    register = () => {
        this.props.history.push('/user/login')
    }

    selectType = (type) =>{
        this.setState({
            type
        })
    }
    

    render(){
        const { type } = this.state;
        return (
            <div>
                <List>
                    <InputItem>用户名</InputItem>
                    <WingBlank />
                    <InputItem>密码</InputItem>
                    <WingBlank />
                    <InputItem>确认密码</InputItem>
                    <WingBlank />
                    <RadioItem onChange={this.selectType.bind(this,'genius')} checked={type==='genius'}>牛人</RadioItem>
                    <RadioItem onChange={this.selectType.bind(this,'boss')} checked={type==='boss'}>BOSS</RadioItem>
                </List>
                <WingBlank>
                    <Button type="primary" onClick={this.register}>注册</Button>
                    <WhiteSpace />
                    <Button type="primary">返回登录</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register