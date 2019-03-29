import React from 'react';
import { Grid, List } from 'antd-mobile';
import styles from './style.less';


class AvatarSelector extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            now: 0,
        }
    }

    clickAvatarImg = (item) => {
        this.setState({icon:item.icon})
        this.props.selectAvatar(item.text)
    }


    render(){
        const avatarList = 'boy,bull,chick,crab,girl,hedgehog,hippo,koala,lemur,man,pig,tiger,whale,woman,zebra'
                            .split(',')
                            .map(item=>({
                                icon: require(`../../assets/images/${item}.png`),
                                text:item
                            }))
        const gridHeader = this.state.icon ? 
                            <div>
                                <span>已选头像</span>
                                <img src={this.state.icon} />
                            </div>  
                            : "请选择头像"                  
        return (
            <div>
                <List renderHeader={()=>(gridHeader)}>
                    <Grid data={avatarList} columnNum={5} onClick={this.clickAvatarImg}/>
                </List>
            </div>
        )
    }
}

export default AvatarSelector   