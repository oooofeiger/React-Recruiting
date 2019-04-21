import React from 'react';
import { connect } from 'dva';
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import browserCookies from 'browser-cookies';

const ListItem = List.Item;
const Brief = ListItem.Brief;

@connect(({user})=>({user:user.access.data}))
class User extends React.Component{
    constructor(props){
        super(props);
        

        this.logout = this.logout.bind(this);
    }

    logout = () => {
        const { dispatch } = this.props;
        let alert = Modal.alert;
        alert = alert('注销', '确认退出登录吗?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                browserCookies.erase('userid');
                dispatch({
                    type:'user/handleLogout'
                }) 
            }},
          ])
        
    }

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
                    <ListItem onClick={this.logout} >退出登录</ListItem>
                </List>
            </div>
        ):''
    }
}

export default User;