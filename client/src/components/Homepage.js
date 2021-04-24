import React, {Component} from 'react';
import {API_BASE_URL} from "../constants/api"
import SideNavigation from "./SideNavigation";
import history from './history'

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
                isAuthenticated: true
            });
        }
        console.log('json', json);
    }


    render() {
        return (<div>
            <SideNavigation/>
        </div>);
    }
}

export default Homepage;