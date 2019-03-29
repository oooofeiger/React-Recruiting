import React from 'react';
import { NavBar, List, InputItem, TextareaItem, Button  } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import  AvatarSelector  from "@/components/avatar-selector/avatar-selector";
import styles from './style.less';

@createForm()
@connect(({user})=>({user}))
class BossInfo extends React.Component{
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
        form.validateFields({force: true},(errors)=>{
            if(!errors){
                console.log(form.getFieldsValue())
            }
        })
    }

    render(){
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <div>
                <NavBar mode="dark">BOSS完善信息页面</NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
                <List>
                    <InputItem 
                        {...getFieldProps('title',{
                        })}
                        clear
                        placeholder="请输入招聘职位"
                    >招聘职位</InputItem>
                    <InputItem 
                        {...getFieldProps('company',{
                        })}
                        clear
                        placeholder="请输入公司名称"
                    >公司名称</InputItem>
                    <InputItem 
                        {...getFieldProps('money',{
                        })}
                        clear
                        placeholder="请输入职位薪资"
                    >职位薪资</InputItem>
                    <TextareaItem 
                        {...getFieldProps('desc',{
                        })}
                        clear
                        placeholder="请输入职位要求"
                        title="职位要求"
                        autoHeight
                        rows={3}
                    ></TextareaItem>
                </List>
                <Button style={{marginTop:15}} type="primary" onClick={this.onSubmit}>保存</Button>
            </div>
        )
    }
}

export default BossInfo