import React from 'react';
import {API_BASE_URL} from '../constants/api'
import {scaleDown as Menu} from 'react-burger-menu'
import Typography from "@material-ui/core/Typography";
import history from './history'
import Alert from "@material-ui/lab/Alert";
import { Link } from 'react-router-dom'
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

    setError() {
        let alert_message;
        if (this.state.error_message !== '') {
            alert_message = <Alert severity="error"> {this.state.error_message} </Alert>;
        } else alert_message = null;

        return alert_message;
    }

    clearError() {
        this.setState(
            {error_message: ""}
        )
    }

    render() {
        this.setError()
        console.log(this.state.error_message);
        return (
            <Menu styles={styles}>
                <div>
                    <Link style={items_styles} to='/'>
                        <img src={process.env.PUBLIC_URL + '/Studenthelper.svg'} alt=''/>
                    </Link>
                </div>
                <div style={container_styles}>
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
                        <img src={process.env.PUBLIC_URL + '/notes-svgrepo-com.svg'} alt='' style={icon_styles}/>
                        <Typography variant="h6" style={title_styles}>
                            Notes
                        </Typography>
                    </Link>
                    <a style={items_styles} onClick={this.showSettings} className="menu-item--small">

                    </a>
                </div>
                <div style={item_styles}>
                    <Link style={items_styles} to='/configuration'>
                        <img src={process.env.PUBLIC_URL + '/settings.svg'} alt='' style={icon_styles}/>
                        <Typography variant="h6" style={title_styles}>
                            Configuration
                        </Typography>
                    </Link>
                    <a style={items_styles} onClick={this.showSettings} className="menu-item--small">
                    </a>
                </div>
                </div>
                <div>
                    <a style={log_out_styles} onClick={this.Logout} className="menu-item--small">Log out</a>
                </div>

                <br/>
            </Menu>
        );
    }
}
const container_styles = {
    display:'flex',
    flexDirection:'column'
}
const item_styles = {}
const log_out_styles = {
    position: 'absolute',
    bottom: '15px',
    left: '10px',
    padding: '2.5em 1.5em 0px',
    cursor: 'pointer'

}
const icon_styles = {
    width: '23px',
    height: '23px',
    display: 'inline',
    float: 'left'
};
const items_styles = {
    cursor: 'pointer',
    color: '#554A5E',
    display:'flex',
    alignItems:'center',
    textDecoration:'none'
}
const title_styles = {
    // float: 'left',
    marginLeft: '5px'
}
const styles = {
    bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        left: '36px',
        top: '36px'
    },
    bmBurgerBars: {
        background: '#D5B1F5'
    },

    bmCrossButton: {
        height: '24px',
        width: '24px',
        color: 'rgba(0,0,0,0)',
        cursor:'default'

    },
    bmCross: {
      //  background: '#658ba2',
        margin: '5 10 5 5',
        color: 'rgba(0,0,0,0)',
        cursor:'default'
    },
    bmMenuWrap: {
        position: 'fixed',
        height: '100%'
    },
    bmMenu: {
        background: '#eeedf4',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em',
        overflow:  'hidden'
    },
    bmMorphShape: {
        fill: '#6b7396'
    },
    bmItemList: {
        color: '#554A5E',
        padding: '0.8em'
    },
    bmItem: {
        display: 'inline-block'
    },
    bmOverlay: {
        background: 'rgb(223,216,227)'
    }

}
export default SideNavigation;