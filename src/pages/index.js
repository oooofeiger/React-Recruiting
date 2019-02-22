import React from 'react';
import { connect } from 'dva';

export default 
@connect(({test})=>({
  test
}))
class Test extends React.Component{
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'test/get'
    })
  }

  render(){
    console.log(this.props)
    return (
      <div>
          hello world
      </div>
    )
  }
  
}

