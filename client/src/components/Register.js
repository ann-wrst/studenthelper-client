import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import {login_styles} from './styles'

import Login from './Login';
import {API_BASE_URL} from '../constants/api'
import {Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            repeated_password: '',
            error_message: ''
        }
    }

    componentDidMount() {
        // fetch(API_BASE_URL+'/isAuthenticated', {
        //     credentials: 'include',
        //     method: 'GET',
        //
        // }).then(
        //     async response => {
        //         let res = await response.json();
        //         if(res.isAuthenticated) this.state.isAuthenticated=true;
        //    //     console.log("The user isAuthenticated? "+this.state.isAuthenticated);
        //     }
        // )
    }

    handleClick() {
        const apiBaseUrl = API_BASE_URL;
        console.log("values", this.state.name, this.state.email, this.state.password, this.state.repeated_password);
        const self = this;
        if (this.state.password === this.state.repeated_password) {
            const payload = {
                "username": this.state.name,
                "email": this.state.email.toLowerCase().trim(),
                "password": this.state.password
            };
            fetch(apiBaseUrl + '/register', {
                credentials: 'include',

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }).then(
                async response => {
                    console.log(response);
                    let res = await response.json();
                    this.clearError();
                    if (response.status === 200) {
                        if (!res.success) {
                            this.setState(
                                {error_message: res.error.message}
                            )
                        }
                        const loginscreen = [];
                        loginscreen.push(<Login parentContext={this}/>);
                        const loginmessage = "Not Registered yet?";
                        /*          self.props.parentContext.setState({
                                      loginscreen: loginscreen,
                                      loginmessage: loginmessage,
                                      buttonLabel: "Register",
                                      isLogin: true,
                                  });*/
                    }

                }
            ).catch(function (error) {
                console.log(error);
            })

        } else {
            this.setState(
                {error_message: "The passwords don't match"}
            )
        }
    }

    setError() {
        let alert_message;
        if (this.state.error_message !== "") {
            alert_message = <Alert severity="error"> {this.state.error_message} </Alert>;
        } else alert_message = null;

        return alert_message;
    }

    clearError() {
        this.setState(
            {error_message: ""}
        )
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

                    {this.setError()}
                    <div style={login_styles}>
                    <TextField
                        hintText="Enter your name"
                        label="Name"
                        inputProps={{maxLength: 45}}
                        onChange={(event) => this.setState({name: event.target.value})}
                    />
                    <br/>
                    <TextField
                        required
                        hintText="Enter your Email"
                        type="email"
                        label="Email"
                        inputProps={{maxLength: 255}}

                        onChange={(event) => this.setState({email: event.target.value})}
                    />
                    <br/>
                    <TextField
                        required
                        type="password"
                        hintText="Enter your Password"
                        label="Password"
                        inputProps={{maxLength: 70}}
                        onChange={(event) => this.setState({password: event.target.value})}
                    />
                    <br/>
                    <TextField
                        required
                        type="password"
                        hintText="Enter your Password"
                        label="Confirm Password"
                        inputProps={{maxLength: 70}}

                        onChange={(event) => this.setState({repeated_password: event.target.value})}
                    />
                    <br/>
                    <Button primary={true} style={style} onClick={(event) => this.handleClick(event)} variant="outlined"
                            color="primary">
                        Submit
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
// const appbar_style = {
//     'display': 'flex',
//     'align-content': 'stretch',
//
// }
const generalStyle = {
    'display': 'flex',
    //  'align-content': 'center',
    'flex-direction':'column',
    // 'justify-content':'center',
    //  'align-self':'center',
    'align-items':'center'
};
export default Register;