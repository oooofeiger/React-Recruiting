import Logo from '@/components/WrapLogo';

export default function(props) {
    return (
      <div>
        <Logo />
        {/* <h2>{props.location.pathname === '/user/login'?'登录页':'注册页'} </h2> */}
        { props.children }
      </div>
    );
  }