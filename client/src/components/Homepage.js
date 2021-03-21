import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import {Redirect} from 'react-router-dom';
import {API_BASE_URL} from "../constants/api"
import Example from "./SideNavigation";
import history from './history'

class Homepage extends Component {
    constructor(props){
        super(props);
        this.state={
            loginPage:[],
            uploadScreen:[],
            isAuthenticated: true
        }
    }

     async componentDidMount() {
          await this.isUserAuthenticated();
          console.log(this.state.isAuthenticated);
         if (!this.state.isAuthenticated) {
              history.push('/login');
          }
         }



     isUserAuthenticated = async () => {
        const response = await fetch(API_BASE_URL + '/isAuthenticated', {
            credentials: 'include',
            method: 'GET',
        });

        const json = await response.json();

        if (json.isAuthenticated) {
            this.setState({
                isAuthenticated : true
            });
        }
         console.log('json', json);
    }

    render() {
      //  console.log("The user isAuthenticated? - in component " + this.state.isAuthenticated);
        // if (this.state.isAuthenticated) {
            return (<div>
                <Example/>
            </div>);
        // } else
        //     return <Redirect to="/login"/>;
        // //  }
    }
}

export default Homepage;