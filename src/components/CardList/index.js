import React from 'react';
import { WingBlank, WhiteSpace, Card } from 'antd-mobile';
import PropTypes from 'prop-types';

class CardList extends React.Component{
    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    render(){
        const { userList } = this.props;
        return(
            <WingBlank size="md">
                <WhiteSpace size="md" />
                    {
                        userList && userList.length && userList.map((item,i)=>{
                            return (
                                <Card key={i}>
                                    <Card.Header
                                        title={`${item.user}`}
                                        thumb={item.avatar?require(`@/assets/images/${item.avatar}.png`):require(`@/assets/images/defaultUser.png`)}
                                        extra={<span>{item.job}</span>}
                                    />
                                    <Card.Body>
                                        {item.type === 'boss'?<div>公司：{item.company}</div>:''}
                                        <div>{item.desc}</div>
                                        {item.type === 'boss'?<div>薪资：{item.money}</div>:''}
                                    </Card.Body>
                                    {/* <Card.Footer content="footer content" extra={<div>extra footer content</div>} /> */}
                                </Card>
                            )
                        })
                    }
                    
                <WhiteSpace size="md" />
            </WingBlank>
        )
    }
}

export default CardList;