import React from 'react';
import {API_BASE_URL} from '../constants/api'
import {scaleDown as Menu} from 'react-burger-menu'
import Typography from "@material-ui/core/Typography";
import history from './history'

class Example extends React.Component {
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
        });
        history.push('/login');
    }

    render() {
        return (
            <Menu styles={styles}>
                <div>
                    <a id='main' className='sidebar-title'>
                        <img src={process.env.PUBLIC_URL + '/Studenthelper.svg'} alt=''/>
                    </a>
                </div>
                <div style={item_styles}>
                    <a style={items_styles}>
                        <img src={process.env.PUBLIC_URL + '/schedule_icon.svg'} alt='' style={icon_styles}/>
                        <Typography variant="h6" style={title_styles}>
                            Schedule
                        </Typography> </a>
                </div>
                <br/>
                <div style={item_styles}>
                    <a style={items_styles}>
                        <img src={process.env.PUBLIC_URL + '/deadline_icon.svg'} alt='' style={icon_styles}/>

                        <Typography variant="h6" style={title_styles}>
                            Deadlines
                        </Typography></a>

                </div>
                <div style={item_styles}>
                    <a style={items_styles} onClick={this.showSettings} className="menu-item--small">
                        <Typography variant="h6" style={title_styles}>
                            Settings
                        </Typography>

                    </a>
                </div>

                <div>
                    <a style={log_out_styles} onClick={this.Logout} className="menu-item--small">Log out</a>
                </div>

                <br/>
            </Menu>
        );
    }
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
    width: '24px',
    height: '24px',
    display: 'inline',
    float: 'left'


};
const items_styles = {
    cursor: 'pointer',

}
const title_styles = {
    float: 'left',
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
    },
    bmCross: {
        background: '#658ba2',
        margin: '5 10 5 5'
    },
    bmMenuWrap: {
        position: 'fixed',
        height: '100%'
    },
    bmMenu: {
        background: '#eeedf4',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
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
export default Example;