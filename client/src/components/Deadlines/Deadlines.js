import React, {Component} from "react";
import SideNavigation from "../SideNavigation";
import AddDeadline from "./AddDeadline";
import Typography from "@material-ui/core/Typography";
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
import EmptyStub from "../Configuration/EmptyStub";
import {FormControlLabel} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import SubjectServices from "../../services/SubjectServices";
import DeadlineServices from "../../services/DeadlineServices";

class Deadlines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deadlines_list: [],
            subjects_list: [],
            anchorEl: null,
            hideOld: true
        }
        this.fetchDeadlines = this.fetchDeadlines.bind(this);
        this.handleHideOld = this.handleHideOld.bind(this);
    }

    async componentDidMount() {
        await this.fetchDeadlines();
        await this.fetchSubjectList();
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

    async fetchDeadlines() {
        let res = await DeadlineServices.fetchDeadlines();
        if (res?.success) {
            this.setState({deadlines_list: res?.data});
        } else if (!res?.success) {
            this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
        }
    }

    deadlines_list = []

    async fetchSubjectList() {
        let res = await SubjectServices.fetchSubjectList();
        if (res?.success) {
            this.setState({subjects_list: res?.data});
        } else if (!res?.success) {
            this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
        }
    }

    async handleCheck(id, isDone) {
        let res = await DeadlineServices.handleCheck(id, isDone);
        if (!res?.success) {
            this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
        }
        await this.fetchDeadlines();
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
    currentIsDone;

    handleMoreButton(event, id, date, task, subject, isDone) {
        [this.currentId, this.currentDate, this.currentSubject, this.currentTask, this.currentIsDone] = [id, date, subject, task, isDone];
        this.setState({anchorEl: event.currentTarget});
    }

    checkIsTaskNew(date) {
        let today = new Date();
        return new Date(date) > today;
    }

    renderList(keys) {
        if (this.state.hideOld)
            keys = keys.filter((value) => this.checkIsTaskNew(value));
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
                                                onClick={(event) => this.handleMoreButton(event, item.idDeadline, item.date, item.task, item.subjectId, item.isDone)}>
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

    handleHideOld(event) {
        this.setState({hideOld: event.target.checked});
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
        if (dates.length !== 0) {
            return (<div style={page_style}><SideNavigation/>
                <div style={heading_style}>
                    <Typography variant="h5">
                        Tasks
                    </Typography>
                    <AddDeadline fetchList={this.fetchDeadlines} subjects_list={this.state.subjects_list}/></div>

                <FormControlLabel style={switch_style}
                                  control={<Switch checked={this.state.hideOld}
                                                   onChange={this.handleHideOld} name="hideOld"
                                                   size="small" color="primary"/>}
                                  label="Hide old"/>
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
                                  task={this.currentTask} date={this.currentDate} isDone={this.currentIsDone}
                                  subject={this.currentSubject}/>

                    <DeleteDeadline id={this.currentId} fetchList={this.fetchDeadlines}
                                    closeMenu={this.handleCloseMoreButton}/>
                </Menu>
            </div>);
        } else return (<div style={page_style}><SideNavigation/>
            <div style={heading_style}>
                <Typography variant="h5">
                    Tasks
                </Typography>
                <AddDeadline fetchList={this.fetchDeadlines} subjects_list={this.state.subjects_list}/></div>
            <EmptyStub name={"tasks"}/>
        </div>);
    }
}

const page_style = {
    'display': 'flex',
    'flex-direction': 'column',
};
const heading_style = {
    'display': 'flex',
    'flex-direction': 'row',
    'flex-wrap': 'wrap',
    'align-content': 'stretch',
    'margin-left': '20px',
    'margin-top': '10px',
    'margin-bottom': '15px',
    alignItems: 'center'
};
const switch_style = {
    marginLeft: '15px',
    marginBottom: '15px'
};
const date_style = {
    fontFamily: "'Oswald', cursive",
    fontSize: '18px',
    color: '#3F51B5'
};
const list_style = {
    'margin-left': '30px',
};
export default Deadlines;
