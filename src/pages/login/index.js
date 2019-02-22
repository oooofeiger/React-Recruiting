import React from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'dva';
import styles from './style.less';
import Logo from '@/components/logo';

class Login extends React.Component{
    constructor(props){
        super(props);

        this.register = this.register.bind(this);
    }

    register = () => {
        this.props.history.push('/register')
    }

    render(){
        return (
            <div>
                <Logo />
                <h2>登录页</h2>
                
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <WhiteSpace />
                        <InputItem>密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary">登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login