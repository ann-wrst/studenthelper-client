import React, {Component} from 'react';
import './App.css';
import Loginscreen from './components/Loginscreen'
import SubjectsEditor from "./components/Notes/SubjectsEditor";
import  Deadlines from "./components/Deadlines/Deadlines";
import Notes from "./components/Notes/Notes";
import Configuration from "./components/Configuration/Configuration";
import {
    Router,
    Switch,
    Route
} from "react-router-dom";
import history from "./components/history";
import ScheduleTest from "./components/Schedule/Schedule";
import Pomodoro from "./components/Pomodoro/Pomodoro";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPage: [],
            uploadScreen: []
        }
    }

    componentDidMount() {
        const loginPage = [];
        loginPage.push(<Loginscreen appContext={this} key={"login-screen"}/>);
        this.setState({
            loginPage: loginPage
        })

    }

    render() {

        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/login"><Loginscreen/></Route>
                    <Route exact path="/schedule"><ScheduleTest/></Route>
                    <Route exact path="/deadlines"><Deadlines/></Route>
                    <Route exact path="/note/:id" component={SubjectsEditor}/>
                    <Route exact path="/notes"><Notes/></Route>
                    <Route exact path="/configuration"><Configuration/></Route>
                    <Route exact path="/pomodoro"><Pomodoro/></Route>
                    <Route exact path="/"><ScheduleTest/></Route>
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