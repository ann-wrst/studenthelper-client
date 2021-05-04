import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import AddSchedule from "./AddSchedule";
import {API_BASE_URL} from "../../constants/api";
import history from "../history";
import SideNavigation from "../SideNavigation";
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedules_list: undefined,
            showEven: true,
        }
        this.fetchSchedules = this.fetchSchedules.bind(this);
        this.handleChangeSwitch=this.handleChangeSwitch.bind(this);
    }

    componentDidMount() {
        this.fetchSchedules();
    }

    // getCurrentWeekParity() {
    //     let todaydate = new Date();
    //     let oneJan = new Date(todaydate.getFullYear(), 0, 1);
    //     let numberOfDays = Math.floor((todaydate - oneJan) / (24 * 60 * 60 * 1000));
    //     let res = Math.ceil((todaydate.getDay() + 1 + numberOfDays) / 7);
    //     return res % 2 === 0;
    // }

    fetchSchedules() {
        fetch(API_BASE_URL + '/schedules', {
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
                    this.setState({schedules_list: res?.data})
                }
                return res;
            }
        );
    }

    getScheduleByDayAndNumber(weekday, number, parity = null) {
        if (!this.schedules_list[weekday]) return null;
        let res = [];

        if (parity == null)
            for (let i = 0; i < this.schedules_list[weekday].length; i++) {
                if (this.schedules_list[weekday][i]?.$class?.number === number) {
                    res.push(this?.schedules_list[weekday][i]);
                }
            }
        else {
            if ((this.state.showEven && parity === 0) || (!this.state.showEven && parity === 1)) return res;

            for (let i = 0; i < this.schedules_list[weekday].length; i++) {
                if (this.schedules_list[weekday][i]?.$class?.number === number && this.schedules_list[weekday][i]?.parity === parity) {
                    res.push(this?.schedules_list[weekday][i]);
                }
            }
        }
        return res;
    }

    weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    schedules_list = []

    renderTime(from, to) {
        if (typeof from !== 'undefined' && typeof to !== 'undefined') {
            from = from.slice(0, -3);
            to = to.slice(0, -3);
            return `${from} - ${to}`;
        } else return null;
    }

    handleChangeSwitch(event) {
        this.setState({
            showEven: event.target.checked
        })
    }

    renderMoreButton(day, number) {
        if (this.getScheduleByDayAndNumber(day, number)[0])
            return (<div style={more_button}>
                <IconButton size="small"><MoreVertIcon/></IconButton>
            </div>)
    }

    renderParityLabel(actualParity) {
        if (actualParity)
            return (<i>even week</i>);
        else if (!actualParity && typeof actualParity !== 'undefined') return (<i>odd week</i>);
        else return null;
    }


    renderSchedule(num, day, dayIdx) {
        let trfa = [1, 0];
        if (!this.getScheduleByDayAndNumber(dayIdx, num)) {
            return (
                <div style={table_item}>
                </div>
            )
        }
        if (this.getScheduleByDayAndNumber(dayIdx, num)[0]?.parity == null)
            return (
                <div style={table_item}>
                    <div style={class_info_container}>
                        <div>
                            <div>
                                <div>
                                    {this.getScheduleByDayAndNumber(dayIdx, num)[0]?.subject?.name}
                                </div>
                                <div>
                                    {this.getScheduleByDayAndNumber(dayIdx, num)[0]?.parity}
                                </div>
                                <div>
                                    {this.getScheduleByDayAndNumber(dayIdx, num)[0]?.classtype?.typeName}
                                </div>
                                <div>
                                    {this.getScheduleByDayAndNumber(dayIdx, num)[0]?.teacher?.surname} {this.getScheduleByDayAndNumber(dayIdx, num)[0]?.teacher?.name}
                                </div>
                                <div>
                                    {this.renderTime(this.getScheduleByDayAndNumber(dayIdx, num)[0]?.$class?.from, this.getScheduleByDayAndNumber(dayIdx, num)[0]?.$class?.to)}
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.renderMoreButton(dayIdx, num)}
                    <Divider orientation="vertical" flexItem/>
                </div>
            );
        else return (
            <div style={table_item}>
                {trfa.map((tf) =>
                    <div>
                        <div style={inside_double}>
                            <div style={class_info_container}>
                                <div>
                                    <div>
                                        <div>
                                            {this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.subject?.name}
                                        </div>
                                        <div>
                                            {this.renderParityLabel(this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.parity)}
                                        </div>
                                        <div>
                                            {this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.classtype?.typeName}
                                        </div>
                                        <div>
                                            {this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.teacher?.surname} {this.getScheduleByDayAndNumber(dayIdx, num, tf)?.teacher?.name}
                                        </div>
                                        <div>
                                            {this.renderTime(this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.$class?.from, this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.$class?.to)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.parity != null ? this.renderMoreButton(dayIdx, num) : ""}
                            <Divider orientation="vertical" flexItem/>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    render() {
        this.schedules_list = this.state.schedules_list;
        if (typeof this.state.schedules_list === 'undefined') {
            this.schedules_list = []
        }
        let elements = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let items = []
        for (const [index, value] of elements.entries()) {
            items.push(<TableCell style={table_heading} align="center">{value} <AddSchedule
                dayNumber={index + 1} fetchSchedules={this.fetchSchedules} day={value}/></TableCell>)
        }
        return (<div>
                <SideNavigation fromSchedule={true} showEven={this.state.showEven}
                                handleSwitch={this.handleChangeSwitch}/>
                <TableContainer component={Paper}>
                    <Table className="table" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>

                                </TableCell>
                                {items}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {numbers.map((num) => (
                                <TableRow style={row_style} key={num}>
                                    <TableCell style={num_style}>
                                        {num}
                                    </TableCell>
                                    {this.weekdays.map((day, dayIdx) => (
                                        <TableCell align="center">

                                            {this.renderSchedule(num, day, dayIdx, this.state.showEven)}

                                        </TableCell>
                                    ))
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

const table_double_item = {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'center'
}
const table_item = {
    display: 'flex',
    justifyContent: 'flex-end',
}
const inside_double = {
    display: 'flex'
}
const more_button = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    cursor: 'pointer'
}

const num_style = {
    fontWeight: 'bold',
    fontSize: '18px'
}
const row_style = {
    height: '133px'
}
const class_info_container = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}
const table_heading = {}
export default Schedule;