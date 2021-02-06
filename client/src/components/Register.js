import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Login from './Login';
import {API_BASE_URL} from '../constants/api'
import {Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            password:'',
            repeated_password: ''
        }
    }
    handleClick(event){
        const apiBaseUrl = API_BASE_URL;
        console.log("values",this.state.name,this.state.email,this.state.password);
        //To be done:check for empty values before hitting submit
        const self = this;
        const payload = {
            "username": this.state.name,
            "email": this.state.email,
            "password": this.state.password
        };
        fetch(apiBaseUrl+'/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(
            response=> {
                console.log(response);
                if(response.data.code == 200){
                    const loginscreen = [];
                    loginscreen.push(<Login parentContext={this}/>);
                    const loginmessage = "Not Registered yet. Go to registration";
                    self.props.parentContext.setState({loginscreen:loginscreen,
                        loginmessage:loginmessage,
                        buttonLabel:"Register",
                        isLogin:true
                    });
                }
            }
        ).catch(function (error) {
            console.log(error);
        })
    }
    render() {
        return (
            <div>
                    <div>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography variant="h6">
                                    Register
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <TextField
                            hintText="Enter your name"
                            label="Name"
                            onChange = {(event) => this.setState({name:event.target.value})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Email"
                            type="email"
                            label="Email"
                            onChange = {(event) => this.setState({email:event.target.value})}
                        />
                        <br/>
                        <TextField
                            type = "password"
                            hintText="Enter your Password"
                            label="Password"
                            onChange = {(event) => this.setState({password:event.target.value})}
                        />
                        <br/>
                        <Button primary={true} style={style} onClick={(event) => this.handleClick(event)}>
                            Submit
                        </Button>
                    </div>
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default Register;