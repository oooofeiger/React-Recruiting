import React from 'react';
import { connect } from 'dva';
import { Result, List, WhiteSpace } from 'antd-mobile';

const ListItem = List.Item;
const Brief = ListItem.Brief;
@connect(({user})=>({user:user.access.data}))
class User extends React.Component{


    render(){
        const { user } = this.props;
        return user?(
            <div>
                <Result
                    img={<img src={require(`@/assets/images/${user.avatar}.png`)} style={{width:50}} alt="userImg" />}
                    title={user.user}
                    message={user.type==='boss'?user.company:''}
                ></Result>
                <List renderHeader={()=>'简介'}>
                    <ListItem
                        multipleLine
                    >
                        {user.job}
                        {user.desc.split('\n').map((item,i)=>(
                            <Brief key={i}>{item}</Brief>
                        ))}
                        {user.money?<Brief>薪资：{user.money}</Brief>:''}
                    </ListItem>
                </List>
                <WhiteSpace/>
                <List>
                    <ListItem  >退出登录</ListItem>
                </List>
            </div>
        ):''
    }
}

export default User;