import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, {Component} from 'react'
import {API_BASE_URL} from '../constants/api'
import 'fontsource-roboto';
import {Toolbar} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import history from './history'

import {login_styles} from './styles'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error_message: '',
            isLoggedIn: false
        }
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick() {
        const apiBaseUrl = API_BASE_URL;
        const self = this;
        const payload = {
            "email": this.state.email.toLowerCase().trim(),
            "password": this.state.password
        };

        fetch(apiBaseUrl + '/login', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
            .then(
                async response => {
                    console.log(response);
                    let res = await response.json();
                    this.clearError();
                    if (response.status === 200) {
                        if (!res.success) {
                            this.setState(
                                {error_message: res.error.message}
                            )
                        } else {
                            this.setState({isLoggedIn: true});
                        }
                        //    const uploadScreen = [];
                        //    uploadScreen.push(<Homepage appContext={self.props.appContext}/>)
                        //     self.props.appContext.setState({loginPage: [], uploadScreen: uploadScreen})

                    } else {
                        if (typeof res.error.message !== "undefined")
                            this.setState(
                                {error_message: res.error.message}
                            )
                    }
                    if (this.state.isLoggedIn) history.push('/');

                }
            )
            .catch(function (error) {
                console.log(error);
            });
    }

    setError() {
        let alert_message;
        if (this.state.error_message !== '') {
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
                                Login
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    {this.setError()}
                    <div style={login_styles}>
                        <TextField
                            style={style}
                            type="email"
                            hintText="Enter your email"
                            label="Email"
                            inputProps={{maxLength: 255}}
                            onChange={(event) => this.setState({email: event.target.value})}
                        />
                        <br/>
                        <TextField
                            style={style}
                            type="password"
                            hintText="Enter your Password"
                            label="Password"
                            inputProps={{maxLength: 70}}
                            onChange={(event) => this.setState({password: event.target.value})}
                        />
                        <br/>
                        <Button variant="outlined" color="primary" primary={true} style={style}
                                onClick={(event) => this.handleClick()}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>

        );
    }
}

const style = {
    margin: 10,
};
export default Login;