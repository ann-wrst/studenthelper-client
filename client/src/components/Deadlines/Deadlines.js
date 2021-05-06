import {API_BASE_URL} from "../../constants/api"
import React, {Component} from "react";
import SideNavigation from "../SideNavigation";
import AddDeadline from "./AddDeadline";
import Typography from "@material-ui/core/Typography";

class Deadlines extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div style={page_style}><SideNavigation/>
            <div style={heading_style}>
                <Typography variant="h6" style={subjectsheading_style}>
                Tasks
            </Typography>
                <AddDeadline fetchList={this.fetchDeadlines}/></div>
        </div>);
    }
}

const page_style = {
    'display': 'flex',
    'flex-direction': 'column',
};
const subjectsheading_style = {
    'margin-left': '20px'
};
const heading_style = {
    'display': 'flex',
    'flex-direction': 'row',
    'flex-wrap': 'wrap',
    'align-content': 'stretch'
};
export default Deadlines;
