import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import Button from '@material-ui/core/Button';

class Loginscreen extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            loginscreen:[],
            loginmessage:'',
            buttonLabel:'Register',
            isLogin:true
        }

    }
    componentWillMount(){
        const loginscreen = [];
        loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>);
        const loginmessage = "Not registered yet?";
        this.setState({
            loginscreen:loginscreen,
            loginmessage:loginmessage
        })
    }
    handleClick(){
        let loginscreen;
        let loginmessage;
        if(this.state.isLogin){
            loginscreen = [];
            loginscreen.push(<Register parentContext={this}/>);
            loginmessage = "Already registered?";
            this.setState({
                loginscreen:loginscreen,
                loginmessage:loginmessage,
                buttonLabel:"Login",
                isLogin:false
            })
        }
        else{
            loginscreen = [];
            loginscreen.push(<Login parentContext={this}/>);
            loginmessage = "Not Registered yet?";
            this.setState({
                loginscreen:loginscreen,
                loginmessage:loginmessage,
                buttonLabel:"Register",
                isLogin:true
            })
        }
    }
    render() {
        return (
            <div className="loginscreen">
                {this.state.loginscreen}
                <div>
                    {this.state.loginmessage}
                        <div>
                            <Button primary={true} style={style} onClick={(event) => this.handleClick(event)}>
                                {this.state.buttonLabel}
                            </Button>
                        </div>
                </div>
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default Loginscreen;