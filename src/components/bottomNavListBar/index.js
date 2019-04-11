import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { TabBar } from 'antd-mobile';

const TabBarItem = TabBar.Item;

@connect(({user})=>({user}))
class BottomNavListBar extends React.Component{
    static propTypes = {
        navList: PropTypes.array.isRequired
    }

    constructor(props){
        super(props);
        this.state={
            selectedTab: props.navList && props.navList[0].icon
        }
    }

    handleClickTabBar = (item) => {
        this.setState({
            selectedTab: item.icon
        })
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
                            selected={item.icon === selectedTab}
                            onPress={this.handleClickTabBar.bind(this,item)}
                        >
                            {item.Component}
                        </TabBarItem>
                    ))
                }
            </TabBar>
        )
    }
}

export default BottomNavListBar;