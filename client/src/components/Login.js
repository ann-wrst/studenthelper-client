import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react'
import Uploadscreen from './Uploadscreen'
import {API_BASE_URL} from '../constants/api'
import 'fontsource-roboto';
import App from "../App";
import {Toolbar} from "@material-ui/core";
class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        }
    }
    handleClick(event) {
        const apiBaseUrl = API_BASE_URL;
        const self = this;
        const payload = {
            "email": this.state.email,
            "password": this.state.password
        };

        fetch(apiBaseUrl + '/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(payload)
        })
            .then(
                response => {
                    console.log(response);
                    if (response.status === 200) {
                        console.log("Login successful");
                        const uploadScreen = [];
                        uploadScreen.push(<Uploadscreen appContext={self.props.appContext}/>)
                        self.props.appContext.setState({loginPage: [], uploadScreen: uploadScreen})
                    } else if (response.status === 204) {
                        console.log("Username password do not match");
                        alert("username password do not match")
                    } else {
                        console.log("Email does not exists");
                        alert("Email does not exist");
                    }
                }
            )
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                    <div>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography variant="h6">
                                    Login
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <TextField
                            type="email"
                            hintText="Enter your email"
                            label="Email"
                            onChange = {(event) => this.setState({email:event.target.value})}
                        />
                        <br/>
                        <TextField
                            type="password"
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
export default Login;