import React from 'react';
import {API_BASE_URL} from '../constants/api'
import {scaleDown as Menu} from 'react-burger-menu'
import Typography from "@material-ui/core/Typography";
import history from './history'
import Alert from "@material-ui/lab/Alert";
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ErrorSnackbar from "./ErrorSnackbar";

class SideNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error_message: ''
        }
        this.Logout = this.Logout.bind(this);
    }

    showSettings(event) {
        event.preventDefault();
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

    // setError() {
    //     let alert_message;
    //     if (this.state.error_message !== '') {
    //         alert_message = <Alert severity="error"> {this.state.error_message} </Alert>;
    //     } else alert_message = null;
    //
    //     return alert_message;
    // }

    clearError() {
        this.setState(
            {error_message: ""}
        )
    }

    render() {
        // this.setError()
        console.log(this.state.error_message);
        return (
            <AppBar position="static">
                <Toolbar>
                    {/*<IconButton edge="start"  color="inherit" aria-label="menu">*/}
                    {/*    <MenuIcon/>*/}
                    {/*</IconButton>*/}
                    {/*<Link to='/'>*/}
                    {/*    <img src={process.env.PUBLIC_URL + '/Studenthelper.svg'} alt=''/>*/}
                    {/*</Link>*/}
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
                                    Deadlines
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
                        <div style={log_out_styles}>
                    <Button color="inherit" onClick={this.Logout}>Logout</Button>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

const menu_style = {
    display: 'flex',
    alignItems: 'center'
}
const item_styles = {
    paddingRight:'20px'
}
const log_out_styles = {
    position: 'absolute',
    right: '5px',
    // padding: '2.5em 1.5em 0px',
    // cursor: 'pointer'
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