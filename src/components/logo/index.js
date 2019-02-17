import React from 'react';
import logo from '../../assets/job.png';
import style from './style.less';

class Logo extends React.Component{


    render(){
        return (
            <div className={style.logo}>
                <img src={logo} />
            </div>
        )
    }
}

export default Logo 