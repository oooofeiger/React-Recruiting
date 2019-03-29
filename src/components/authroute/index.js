import React from 'react';
import router from 'umi/router';


export default class Authroute extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const { isAuth } = this.props;
        if(!isAuth){
            router.push('/user/login')
        }
    }


    render(){
        const { children } = this.props;

        return <div>{children}</div>
    }
}