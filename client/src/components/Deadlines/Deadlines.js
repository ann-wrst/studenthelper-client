import {API_BASE_URL} from "../../constants/api"
import React, {Component} from "react";
import SideNavigation from "../SideNavigation";
import AddDeadline from "./AddDeadline";
import Typography from "@material-ui/core/Typography";
import history from "../history";
import ErrorSnackbar from "../ErrorSnackbar";

class Deadlines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deadlines_list: [{
                date: "2021-05-26T11:11:00.000Z",
                deadline: "`12345",
                subjectId: "7f3eccfb-46ab-4d2b-a2f4-e321be3f6aad",
                isDone: false
            }, {
                date: "2021-05-26T12:11:00.000Z",
                deadline: "another",
                subjectId: "blablaid",
                isDone: false
            }, {
                date: "2021-05-28T12:11:00.000Z",
                deadline: "another",
                subjectId: "blablaid",
                isDone: false
            }
            ]
        }
    }

    componentDidMount() {
        this.fetchDeadlines();
    }

    sortByDate(a, b) {

    }

    grouped_dates = [];

    getDates() {
        let keys = []
        for (let k in this.grouped_dates) {
            keys.push(k);
        }
        return keys;
    }

    removeTimeFromDate(curDate) {
        let currentDate = new Date(curDate);
        let [year, month, date] = [currentDate?.getFullYear(), currentDate?.getMonth(), currentDate?.getDate()]
        return new Date(year, month, date);
    }

    groupByDate(date) {
        if (!(date in this.grouped_dates)) {
            this.grouped_dates[date] = [];
            for (let i in this.state.deadlines_list) {
                let currentDate = this.removeTimeFromDate(this.state.deadlines_list[i]?.date);
                if (currentDate.toISOString() === date.toISOString()) {
                    console.log('here')
                    this.grouped_dates[date].push(this.state.deadlines_list[i]);
                    console.log(this.grouped_dates[date]);
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
                    this.state.deadlines_list = res?.data;
                } else if (!res?.success) {
                    this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
                }
                return res;
            }
        );
    }

    render() {
        this.grouped_dates = [];
        for (let i = 0; i < this.state.deadlines_list?.length; i++) {
            let currentDate = this.removeTimeFromDate(this.state.deadlines_list[i]?.date);
            if (typeof this.groupByDate(currentDate) !== 'undefined')
                this.grouped_dates.push(this.groupByDate(currentDate));
        }
        console.log(this.grouped_dates);
        console.log(this.getDates());
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
