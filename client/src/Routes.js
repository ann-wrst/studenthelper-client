import React from "react";
import Login from "./components/Login";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class Routes extends React.Component {
    render() {
        return (
            <Route exact path="/login">
                <Login />
            </Route>
        )
    }

}
export default Routes;