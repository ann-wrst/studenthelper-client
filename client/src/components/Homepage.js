import React, {Component} from 'react';
import {API_BASE_URL} from "../constants/api"
import SideNavigation from "./SideNavigation";
import history from './history'
import Schedule from "./Schedule/Schedule";
import ErrorSnackbar from "./ErrorSnackbar";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPage: [],
            uploadScreen: [],
            isAuthenticated: false
        }
    }

    async componentDidMount() {
        await this.isUserAuthenticated();
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
        if (!json?.success) {
            this.error = <ErrorSnackbar open={true} message={json?.error?.message}/>;
        }
        if (json.isAuthenticated) {
            this.setState({
                isAuthenticated: true
            });
        }
    }
    error;

    render() {
        return (<div>
            {this.error}
            <SideNavigation/>
            <Schedule/>
        </div>);
    }
}

export default Homepage;