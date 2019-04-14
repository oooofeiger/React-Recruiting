import React from 'react';
import { WingBlank, WhiteSpace, Card } from 'antd-mobile';
import { connect } from 'dva';

@connect(({user})=>({user}))
class Boss extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

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
            <WingBlank size="md">
                <WhiteSpace size="md" />
                    {
                        user.userList && user.userList.length && user.userList.map((item,i)=>{
                            return (
                                <Card key={i}>
                                    <Card.Header
                                        title={`${item.user}`}
                                        thumb={item.avatar?require(`@/assets/images/${item.avatar}.png`):require(`@/assets/images/defaultUser.png`)}
                                        extra={<span>{item.job}</span>}
                                    />
                                    <Card.Body>
                                        <div>{item.desc}</div>
                                    </Card.Body>
                                    <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
                                </Card>
                            )
                        })
                    }
                    
                <WhiteSpace size="lg" />
            </WingBlank>
        )
    }
}

export default Boss;