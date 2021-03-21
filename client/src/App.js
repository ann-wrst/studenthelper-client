import React, { Component } from 'react';
import './App.css';
import Loginscreen from './components/Loginscreen'
import {API_BASE_URL} from "./constants/api"
import {
    Router,
    Switch,
    Route
} from "react-router-dom";
import history from "./components/history";
//import { ConnectedRouter as Router} from 'connected-react-router'

import Homepage from "./components/Homepage";

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[]
    }
  }
  componentDidMount(){
      // fetch(API_BASE_URL+'/isAuthenticated', {
      //   credentials: 'include',
      //   method: 'GET',
      //
      // }).then(
      //     async response => {
      //       let res = await response.json();
      //       if(res.isAuthenticated) this.state.isAuthenticated=true;
      //       console.log("The user isAuthenticated? "+this.state.isAuthenticated);
      //     }
      // )
    const loginPage = [];
    loginPage.push(<Loginscreen appContext={this} key={"login-screen"}/>);
    this.setState({
      loginPage:loginPage
    })

  }
  render() {

      return (
          <Router history={history}>
              <Switch>
              <Route exact path="/login"><Loginscreen/></Route>
              <Route exact path="/"><Homepage/></Route>
              </Switch>
          </Router>
      );
  }

   //     <div className="App">
        //  {this.state.loginPage}
        //  {this.state.uploadScreen}
      //  </div>
  //  );
//  }
}

export default App;