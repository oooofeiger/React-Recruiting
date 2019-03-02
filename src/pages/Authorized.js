import Authroute from '@/components/authroute';

export default (props) => {
    return (
      <div>
        <Authroute children={props.children} authority={localStorage.getItem('identity')} />
      </div>
    );
  }