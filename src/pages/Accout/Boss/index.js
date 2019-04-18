import React from 'react';
import { WingBlank, WhiteSpace, Card } from 'antd-mobile';
import { connect } from 'dva';
import CardList from '@/components/CardList';

@connect(({user})=>({user}))
class Boss extends React.Component{
    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({
            type: 'user/handleGetUserList',
            payload: 'genius'
        })
    }

    render(){
        const { user } = this.props;
        console.log(user.userList, 111)
        return(
            user.userList && user.userList.length ? <CardList userList={user.userList}/>:''
        )
    }
}

export default Boss;