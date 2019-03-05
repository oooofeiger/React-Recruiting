import React from 'react';
import logoImg from '../../assets/job.png';
import style from './style.less';

class Logo extends React.Component{


    render(){
        return (
            <div className={style.logo}>
                <img src={logoImg} alt="logo"/>
            </div>
        )
    }
}

export default Logo 