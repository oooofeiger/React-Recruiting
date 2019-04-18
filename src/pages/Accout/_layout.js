import React from 'react';
import { connect } from 'dva';
import Boss from '@/pages/Accout/Boss';
import Genius from '@/pages/Accout/Genius';
import Msg from '@/pages/Accout/Msg';
import User from '@/pages/Accout/User';
import BottomNavListBar from '@/components/bottomNavListBar'
// import './style.less'

@connect(({user})=>({user}))
class Dashboard extends React.Component{


  render(){
    const { user, location } = this.props;
    const navList = [{
      path:'/accout/boss',
      text: '牛人',
      icon: 'boss',
      title: '牛人列表',
      component: <Boss />,
      hide: user.access?user.access.data?user.access.data.type==='genius':'':''
    },{
      path:'/accout/genius',
      text: 'Boss',
      icon: 'work',
      title: 'Boss列表',
      component: <Genius/>,
      hide: user.access?user.access.data?user.access.data.type==='boss':'':''
    },{
      path:'/accout/msg',
      text: '消息',
      icon: 'msg',
      title: '消息列表',
      component: <Msg></Msg>
    },{
      path:'/accout/me',
      text: '我',
      icon: 'user',
      title: '个人中心',
      component: <User></User>
    }]
    return (
      <div style={{width:'100%',position:'fixed',height:'100%',top:0}}>
        {/* <NavBar mode="dard">{navList.find(item=>item.path===pathname).title}</NavBar>
        { this.props.children } */}
        <BottomNavListBar path={location.pathname} navList={navList}></BottomNavListBar>
      </div>
    )
  }
}
export default Dashboard;