import React, { Component } from 'react';
import './App.css';
import Loginscreen from './components/Loginscreen'
import Schedule from "./components/Schedule";
import Deadlines from "./components/Deadlines";
import Notes from "./components/Notes";
import {
    Router,
    Switch,
    Route
} from "react-router-dom";
import history from "./components/history";

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
              <Route exact path="/schedule"><Schedule/></Route>
              <Route exact path="/deadlines"><Deadlines/></Route>
              <Route exact path="/notes"><Notes/></Route>
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