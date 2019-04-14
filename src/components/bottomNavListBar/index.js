import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import router from 'umi/router';
import { TabBar, NavBar, Icon } from 'antd-mobile';
import styles from './style.less';

const TabBarItem = TabBar.Item;

@connect(({user})=>({user}))
class BottomNavListBar extends React.Component{
    static propTypes = {
        navList: PropTypes.array.isRequired
    }

    constructor(props){
        super(props);
        this.state={
            selectedTab: ''
        }
    }

    componentDidMount(){
        const { path } = this.props;
        this.setState({
            selectedTab: path
        })
    }

    handleClickTabBar = (item) => {
        this.setState({
            selectedTab: item.path
        })
        router.push(item.path);
    }


    render(){
        const navList = this.props.navList.filter(item=>!item.hide);
        const { selectedTab } = this.state;
        
        console.log(navList)
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                // hidden={this.state.hidden}
                tabBarPosition="bottom"
                style={{position:'fixed',bottom:0,width:'100%'}}
            >
                {
                    navList && navList.map((item)=>(
                        <TabBarItem
                            key={item.path}
                            title={item.text}
                            icon={{uri: require(`../../assets/images/${item.icon}.png`)}}
                            selectedIcon={{uri: require(`../../assets/images/${item.icon}-active.png`)}}
                            selected={item.path === selectedTab}
                            onPress={this.handleClickTabBar.bind(this,item)}
                        >
                        <NavBar icon={<Icon type="left" />} className={styles.fixedHeader} mode="dard">{item.title}</NavBar>
                        <div style={{marginTop:45}}>
                            {item.component}
                        </div>
                            
                        </TabBarItem>
                    ))
                }
            </TabBar>
        )
    }
}

export default BottomNavListBar;