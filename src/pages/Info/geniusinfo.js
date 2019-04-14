import React from 'react';
import { NavBar, List, InputItem, TextareaItem, Button  } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import  AvatarSelector  from "@/components/avatar-selector/avatar-selector";
import styles from './style.less';

@createForm()
@connect(({user})=>({user}))
class GeniusInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            now: 0,
        }
        this.selectAvatar = this.selectAvatar.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    selectAvatar = (avatar) => {
        this.setState({avatar})
    }

    onSubmit = () => {
        const { dispatch, form } = this.props;
        const { avatar } = this.state;
        form.validateFields({force: true},(errors)=>{
            if(!errors){
                console.log(form.getFieldsValue());
                dispatch({
                    type: 'user/handleInfoUpdate',
                    payload: {
                        avatar,
                        ...form.getFieldsValue()
                    }
                })
            }
        })
    }

    render(){
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <div>
                <NavBar mode="dark">牛人完善信息页面</NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
                <List>
                    <InputItem 
                        {...getFieldProps('job',{
                        })}
                        clear
                        placeholder="求职岗位"
                    >求职岗位</InputItem>
                    <TextareaItem 
                        {...getFieldProps('desc',{
                        })}
                        clear
                        placeholder="请输个人简介"
                        title="个人简介"
                        autoHeight
                        rows={3}
                    ></TextareaItem>
                </List>
                <Button style={{marginTop:15}} type="primary" onClick={this.onSubmit}>保存</Button>
            </div>
        )
    }
}

export default GeniusInfo