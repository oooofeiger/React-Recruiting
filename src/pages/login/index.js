import React from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
// import styles from './style.less';

@createForm()
@connect(({user})=>({user}))
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            now: 0,
        }
        this.register = this.register.bind(this);
        this.clickError = this.clickError.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    register = () => {
        this.props.history.push('/user/register')
    }

    clickError = (message) => {
        Toast.fail(message, 1)
    }

    onSubmit = () => {
        const { form, dispatch } = this.props;
        form.validateFields({ force: true}, (error)=> {
            if(!error){
                console.log(form.getFieldsValue());
                dispatch({
                    type: 'user/handleLogin',
                    payload: form.getFieldsValue()
                })
                
            }
        })
    }

    render(){
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <div>
                <form>
                    <WingBlank>
                        <List>
                            <WhiteSpace />
                            <InputItem 
                                {...getFieldProps('user',{
                                    rules: [
                                        { required: true, message: '用户名不能为空！'}
                                    ]
                                })}
                                clear
                                error={!!getFieldError('user')}
                                onErrorClick={this.clickError.bind(this, getFieldError('user'))}
                                placeholder="请输入用户名"
                            >用户</InputItem>
                            <WhiteSpace />
                            <InputItem
                                {...getFieldProps('pwd',{
                                    rules: [
                                        { required: true, message: '用户名不能为空！'}
                                    ]
                                })}
                                clear
                                error={!!getFieldError('pwd')}
                                onErrorClick={this.clickError.bind(this, getFieldError('pwd'))}
                                placeholder="请输入密码"
                                type='password'
                            >密码</InputItem>
                        </List>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.onSubmit}>登录</Button>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.register}>注册</Button>
                    </WingBlank>
                </form>
            </div>
        )
    }
}

export default Login