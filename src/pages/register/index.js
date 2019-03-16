import React from 'react';
import router from 'umi/router';
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import styles from './style.less';

const RadioItem = Radio.RadioItem;

@createForm()
@connect(({user})=>({user}))
class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type: 'genius',
        }
        this.toLogin = this.toLogin.bind(this);
        this.selectType = this.selectType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.ensurePwd = this.ensurePwd.bind(this);
        this.clickError = this.clickError.bind(this);
    }

    componentWillReceiveProps(props){
        const { user } = props;
        if(user && user.register && user.register.path){
            router.push(user.register.path);
        }
    }

    onSubmit = () => {
        const { form, dispatch } = this.props;
        const { type } = this.state;
        form.validateFields({ force: true}, (error) => {
            if(!error){
                console.log(form.getFieldsValue())
                dispatch({
                    type: 'user/handleRegister',
                    payload: {
                        ...form.getFieldsValue(),
                        type
                    }
                })
            }
        })
    }

    selectType = (type) =>{
        this.setState({
            type
        })
    }

    toLogin = () => {
        this.props.history.push('/user/login')
    }

    ensurePwd = (rule, value, callback) => {
        const { form } = this.props;
        const { pwd, repeatPwd } = form.getFieldsValue();
        if(pwd === repeatPwd){
            callback()
        }else{
            callback(new Error('确认密码与密码不一致！'))
        }
    }

    clickError = (message) => {
        Toast.fail(message, 1)
    }
    

    render(){
        const { type } = this.state;
        const { user } = this.props;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div>
                <form>
                    <List>
                        <InputItem
                            {...getFieldProps('user',{
                                rules: [
                                    {
                                        required: true, message: '用户名不能为空',
                                    }
                                ]
                            })}
                            clear
                            error={!!getFieldError('user') || user && user.register && user.register.code === 0}
                            onErrorClick={this.clickError.bind(this, user && user.register && user.register.code === 0 && user.register.message)}
                            placeholder="请输入用户名"
                        >用户名</InputItem>
                        <WingBlank />
                        <InputItem
                            {...getFieldProps('pwd',{
                                rules: [
                                    {
                                        required: true, message: '密码不能为空',
                                    }
                                ]
                            })}
                            clear
                            error={!!getFieldError('pwd')}
                            onErrorClick={this.clickError.bind(this, getFieldError('pwd'))}
                            placeholder="请输入密码"
                            type="password"
                        >密码</InputItem>
                        <WingBlank />
                        <InputItem
                            {...getFieldProps('repeatPwd',{
                                rules: [
                                    {
                                        required: true, message: '密码不能为空',
                                    },
                                    {
                                        validator: this.ensurePwd
                                    }
                                ]
                            })}
                            clear
                            error={!!getFieldError('repeatPwd')}
                            onErrorClick={this.clickError.bind(this, getFieldError('repeatPwd'))}
                            placeholder="请输再次输入密码"
                            type="password"
                        >确认密码</InputItem>
                        <WingBlank />
                        <RadioItem onChange={this.selectType.bind(this,'genius')} checked={type==='genius'}>牛人</RadioItem>
                        <RadioItem onChange={this.selectType.bind(this,'boss')} checked={type==='boss'}>BOSS</RadioItem>
                    </List>
                    <WingBlank>
                        <Button type="primary" onClick={this.onSubmit}>注册</Button>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.toLogin}>返回登录</Button>
                    </WingBlank>
                </form>
                
            </div>
        )
    }
}

export default Register