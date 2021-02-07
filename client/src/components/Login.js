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
import Alert from "@material-ui/lab/Alert";
class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            error_message:''
        }
        this.handleClick=this.handleClick.bind(this);
    }
      handleClick() {
        const apiBaseUrl = API_BASE_URL;
        const self = this;
        const payload = {
            "email": this.state.email,
            "password": this.state.password
        };
       /*  let response = await fetch(apiBaseUrl + '/login', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(payload)
         });
             console.log(response);
             console.log(response.status)
             if (response.status === 200) {
                 //res = JSON.parse(res);
                 let res = await response.json();
                 //   res = JSON.parse(await res)
                 console.log(res);
                 if (!res.success) {
                     this.setState(
                         {error_message: res.error}
                         //  {error_message: "An error has occured"}

                     )
                 }
                 console.log("Login successful");
                 const uploadScreen = [];
              //   self.props.appContext.setState({loginPage: [], uploadScreen: uploadScreen});
                 self.props.appContext.state.loginPage=[];
                 self.props.appContext.state.uploadScreen=uploadScreen;
                 await uploadScreen.push(<Uploadscreen appContext={self.props.appContext}/>)
             } else {
                 console.log("Email does not exists");
                 alert("Email does not exist");
             }
*/
        fetch(apiBaseUrl + '/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(payload)
        })
            .then(
               async response => {
                   console.log(response);
                   let res = await response.json();
                   this.clearError();
                    if (response.status === 200) {
                        if(!res.success) {
                            this.setState(
                                {error_message: res.error.message}
                            )
                        }
                        const uploadScreen = [];
                        uploadScreen.push(<Uploadscreen appContext={self.props.appContext}/>)
                        self.props.appContext.setState({loginPage: [], uploadScreen: uploadScreen})

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
    setError() {
        let alert_message;
        if(this.state.error_message!=='') {
            alert_message =<Alert severity="error"> {this.state.error_message} </Alert>;

        } else alert_message=null;

        return alert_message;
    }
    clearError() {
        this.setState(
            {error_message:"" }
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
                        {this.setError("An error has occured")}

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
                            <Button variant="outlined" color="primary" primary={true} style={style} onClick={(event) => this.handleClick()}>
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