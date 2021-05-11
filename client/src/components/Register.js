import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {login_styles} from './styles'
import Login from './Login';
import {API_BASE_URL} from '../constants/api'
import {Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import history from "./history";
import ErrorSnackbar from "./ErrorSnackbar";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            repeated_password: '',
            error: '',
            isLoggedIn: false
        }
    }


    handleClick() {
        if (this.state.password === this.state.repeated_password) {
            const payload = {
                "username": this.state.name,
                "email": this.state.email.toLowerCase().trim(),
                "password": this.state.password
            };
            fetch(API_BASE_URL + '/register', {
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
                    if (!res?.success) {
                        this.setState({error: <ErrorSnackbar open={true} message={res?.error?.message}/>});
                    } else if (response.status === 200) {
                        this.setState({isLoggedIn: true});
                    }
                    const loginscreen = [];
                    loginscreen.push(<Login parentContext={this}/>);

                    if (this.state.isLoggedIn) history.push('/');
                }
            ).catch(function (error) {
                console.log(error);
            })

        } else {
            this.setState(
                {error: <ErrorSnackbar open={true} message={"The passwords don't match"}/>}
            )
        }
    }

    render() {
        return (
            <div>
                {this.state.error}
                <div>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6">
                                Register
                            </Typography>
                        </Toolbar>
                    </AppBar>

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
                        <Button primary={true} style={style} onClick={(event) => this.handleClick(event)}
                                variant="outlined"
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

export default Register;