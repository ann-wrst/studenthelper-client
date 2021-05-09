import React from 'react';
import {API_BASE_URL} from '../constants/api'
import Typography from "@material-ui/core/Typography";
import history from './history'
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";


class SideNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: '',
            name: ''
        }
        this.Logout = this.Logout.bind(this);
    }

    componentDidMount() {
        this.fetchUserInfo();
    }

    fetchUserInfo() {
        fetch(API_BASE_URL + '/me', {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            async response => {
                if (response.status === 403)
                    history.push('/login');
                let res = await response.json();
                this.setState({name: res?.username});
                this.setState({email: res?.email});

            }
        );
    }

    Logout() {
        fetch(API_BASE_URL + '/logout', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(
            async response => {
                let res = await response.json();
                //  this.clearError();
                if (!res.success) {
                    this.setState(
                        {error_message: res.error.message}
                    )
                }
            }
        );
        history.push('/login');
    }


    render() {
        return (
            <AppBar position="static">
                <Toolbar>

                    <div style={menu_style}>
                        <div style={item_styles}>
                            <Link style={items_styles} to='/schedule'>
                                <img src={process.env.PUBLIC_URL + '/schedule_icon.svg'} alt='' style={icon_styles}/>
                                <Typography variant="h6" style={title_styles}>
                                    Schedule
                                </Typography>
                            </Link>
                        </div>
                        <div style={item_styles}>
                            <Link style={items_styles} to='/deadlines'>
                                <img src={process.env.PUBLIC_URL + '/deadline_icon.svg'} alt='' style={icon_styles}/>
                                <Typography variant="h6" style={title_styles}>
                                    Tasks & Deadlines
                                </Typography>
                            </Link>
                        </div>
                        <div style={item_styles}>
                            <Link style={items_styles} to='/notes'>
                                <img src={process.env.PUBLIC_URL + '/notes.svg'} alt='' style={icon_styles}/>
                                <Typography variant="h6" style={title_styles}>
                                    Notes
                                </Typography>
                            </Link>
                        </div>
                        <div style={item_styles}>
                            <Link style={items_styles} to='/configuration'>
                                <img src={process.env.PUBLIC_URL + '/settings.svg'} alt='' style={icon_styles}/>
                                <Typography variant="h6" style={title_styles}>
                                    Configuration
                                </Typography>
                            </Link>
                        </div>
                        <div style={item_styles}>
                            <Link style={items_styles} to='/pomodoro'>
                                <img src={process.env.PUBLIC_URL + '/pomodoro.svg'} alt='' style={icon_styles}/>
                                <Typography variant="h6" style={title_styles}>
                                    Pomodoro
                                </Typography>
                            </Link>
                        </div>
                        <div style={item_styles}>
                            {this.props.fromSchedule ?
                                (<div><FormLabel
                                    component="legend"
                                    style={switch_label}>{this.props.showEven ? "Show even" : "Show odd"}</FormLabel>
                                    <FormControlLabel
                                        control={<Switch checked={this.props.showEven}
                                                         onChange={this.props.handleSwitch} name="showEven"
                                                         size="small" color="default"/>}
                                        labelPlacement="start"
                                        label=""/>
                                </div>) : ""}
                        </div>
                        <div style={userinfo_styles}>
                            {console.log(this.state.name)}
                            {this.state.name}<br/>
                            {this.state.email}
                        </div>
                        <div style={log_out_styles}>
                            <Button color="inherit" onClick={this.Logout}>Logout</Button>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}
const userinfo_styles = {
    position: 'absolute',
    right: '7em',
}
const menu_style = {
    display: 'flex',
    alignItems: 'center'
}
const item_styles = {
    paddingRight: '20px'
}
const log_out_styles = {
    position: 'absolute',
    right: '5px',
}
const switch_label = {
    color: 'white'
}
const icon_styles = {
    width: '20px',
    height: '20px',
    display: 'inline',
    float: 'left'
};
const items_styles = {
    cursor: 'pointer',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
}
const title_styles = {
    marginLeft: '5px'
}
export default SideNavigation;