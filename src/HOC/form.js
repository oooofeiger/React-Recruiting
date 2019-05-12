import React from 'react';

export default function myForm(Comp){
    return class WrapComp extends React.Component{
        constructor(props){
            super(props);
            this.state = {};
            this.handleChange = this.handleChange.bind(this);
        }

        handleChange = (key, val) => {
            this.setState({
                [key]: val
            })
        }

        render(){
            return <Comp handleChange={this.handleChange} formData={this.state} {...this.props}></Comp>
        }
    }
}