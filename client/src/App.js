import React, { Component } from 'react';
import './App.css';
import Loginscreen from './components/Loginscreen'

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
        <div className="App">
          {this.state.loginPage}
          {this.state.uploadScreen}
        </div>
    );
  }
}
const style = {
  margin: 15,
};
export default App;