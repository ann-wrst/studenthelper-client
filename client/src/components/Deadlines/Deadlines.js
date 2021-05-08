import {API_BASE_URL} from "../../constants/api"
import React, {Component} from "react";
import SideNavigation from "../SideNavigation";
import AddDeadline from "./AddDeadline";
import Typography from "@material-ui/core/Typography";
import history from "../history";
import ErrorSnackbar from "../ErrorSnackbar";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import DeleteDeadline from "./DeleteDeadline";
import EditDeadline from "./EditDeadline";

class Deadlines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deadlines_list: [],
            subjects_list: [],
            anchorEl: null
        }
        this.fetchDeadlines = this.fetchDeadlines.bind(this);
    }

    componentDidMount() {
        this.fetchDeadlines();
        this.fetchSubjectList();
    }


    grouped_dates = [];

    getDates(dates) {
        let keys = []
        for (let k in dates) {
            if (dates.hasOwnProperty(k))
                keys.push(k);
        }
        return keys;
    }

    groupByDate(date) {
        if (!(date in this.grouped_dates)) {
            this.grouped_dates[date] = [];
            for (let i in this.state.deadlines_list) {
                let currentDate = new Date(this.state.deadlines_list[i]?.date);
                if (currentDate.toISOString() === date.toISOString()) {
                    this.grouped_dates[date].push(this.state.deadlines_list[i]);
                }
            }
            return this.grouped_dates[date];
        }
    }

    fetchDeadlines() {
        fetch(API_BASE_URL + '/deadlines', {
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
                if (res?.success) {
                    this.setState({deadlines_list: res?.data});
                } else if (!res?.success) {
                    this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
                }
                return res;
            }
        );
    }

    deadlines_list = []

    async fetchSubjectList() {
        fetch(API_BASE_URL + '/subjects', {
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
                if (res?.success) {
                    this.setState({subjects_list: res?.data});
                } else if (!res?.success) {
                    this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
                }
                return res;
            }
        );
    }

    handleCheck(id, isDone) {
        const payload = {
            "isDone": isDone
        }
        fetch(API_BASE_URL + `/deadlines/${id}`, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }).then(
            async response => {
                if (response.status === 403)
                    history.push('/login');
                let res = await response.json();
                if (!res?.success) {
                    this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
                }
                this.fetchDeadlines();
            }
        );
    }

    handleCloseMoreButton = () => {
        this.setState({anchorEl: null});
    };

    getSubjectName(id) {
        for (let i = 0; i < this.state.subjects_list?.length; i++) {
            if (this.state.subjects_list[i].idSubject === id)
                return this.state.subjects_list[i].name
        }
    }

    currentId;
    currentDate;
    currentTask;
    currentSubject;

    handleMoreButton(event, id, date, task, subject) {
        [this.currentId, this.currentDate, this.currentSubject, this.currentTask] = [id, date, subject, task];
        this.setState({anchorEl: event.currentTarget});
    }

    renderList(keys) {
        return (<div style={list_style}>{
            keys.map((date) => (
                <div>
                    <div style={date_style}>
                        {(new Date(this.grouped_dates[date][0].date)).toLocaleDateString('EN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </div>
                    {this.grouped_dates[date].map((item) => (
                        <List>
                            <ListItem dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        color="default"
                                        checked={item.isDone}
                                        tabIndex={-1}
                                        disableRipple
                                        onClick={() => this.handleCheck(item?.idDeadline, !item.isDone)}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={item.task} secondary={this.getSubjectName(item.subjectId)}>
                                </ListItemText>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="comments"
                                                onClick={(event) => this.handleMoreButton(event, item.idDeadline, item.date, item.task, item.subjectId)}>
                                        <MoreVertIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    ))}
                    <Divider/>
                </div>)
            )
        }</div>)
    }

    render() {
        this.deadlines_list = this.state.deadlines_list || [];
        this.grouped_dates = [];
        for (let i = 0; i < this.deadlines_list?.length; i++) {
            let currentDate = this.deadlines_list[i]?.date;
            let grouped = this.groupByDate(new Date(currentDate));
            if (typeof grouped !== 'undefined')
                this.grouped_dates.push(grouped);
        }

        let dates = [];
        for (let i = 0; i < this.getDates(this.grouped_dates).length; i++) {
            let current = this.getDates(this.grouped_dates)[i]
            if (current.length > 4)
                dates.push(current);
        }
        return (<div style={page_style}><SideNavigation/>
            <div style={heading_style}>
                <Typography variant="h6" style={subjectsheading_style}>
                    Tasks
                </Typography>
                <AddDeadline fetchList={this.fetchDeadlines} subjects_list={this.state.subjects_list}/></div>
            {this.renderList(dates)}
            <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleCloseMoreButton}
            >
                <EditDeadline id={this.currentId} fetchList={this.fetchDeadlines}
                              closeMenu={this.handleCloseMoreButton} subjects_list={this.state.subjects_list}
                              task={this.currentTask} date={this.currentDate} subject={this.currentSubject}/>

                <DeleteDeadline id={this.currentId} fetchList={this.fetchDeadlines}
                                closeMenu={this.handleCloseMoreButton}/>
            </Menu>
        </div>);
    }
}

const page_style = {
    'display': 'flex',
    'flex-direction': 'column',
};
const subjectsheading_style = {};
const heading_style = {
    'display': 'flex',
    'flex-direction': 'row',
    'flex-wrap': 'wrap',
    'align-content': 'stretch',
    'margin-left': '20px',
    'margin-top': '10px',
    'margin-bottom': '5px'
};
const date_style = {
    fontFamily: "'Oswald', cursive",
    fontSize: '18px',
    color: '#3F51B5'
};
const list_style = {
    'margin-left': '30px',
};
const menu_item = {
    fontSize: '13px'
}
export default Deadlines;
