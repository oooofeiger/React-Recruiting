import React from 'react';
import { connect } from 'dva';
import Authroute from '@/components/authroute';

@connect(({user})=>({user}))
class WrapAuthroute extends React.Component{
    constructor(props){
      super(props);
    }

    componentDidMount(){
      const { dispatch } = this.props;
      dispatch({
        type: 'user/handleGetAccess'
      })
    }

    render(){
      const { user } = this.props;
      return (
        <div>
          {
            user && user.access?<Authroute children={this.props.children} isAuth={user.access.code===1?true:false} />
            :null
          }
        </div>
      );
    }
}

export default WrapAuthroute;
