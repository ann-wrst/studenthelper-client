import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import AddSchedule from "./AddSchedule";
import {API_BASE_URL} from "../../constants/api";
import history from "../history";
import SideNavigation from "../SideNavigation";
import Divider from '@material-ui/core/Divider';

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedules_list: undefined
        }
    }

    componentDidMount() {
        this.fetchSchedules();
    }

    fetchSchedules() {
        console.log("in comp did mount");

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

    getScheduleByDayAndNumber(weekday, number) {

        //if (this.schedules_list.length === 0) return null;
        if (!this.schedules_list[weekday]) return null;
        let res;

        for (let i = 0; i < this.schedules_list[weekday].length; i++) {
            if (this.schedules_list[weekday][i]?.$class?.number === number) {
                res = this?.schedules_list[weekday][i];
            }
        }
        return res;
    }

    weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    schedules_list = []

    renderTime(from, to) {
        if (typeof from !== 'undefined' && typeof to !== 'undefined')
            return `${from} - ${to}`;
        else return null;
    }

    renderMoreButton(day, number) {
        if (this.getScheduleByDayAndNumber(day, number))
            return (<div style={more_button}>
                <IconButton size="small"><MoreVertIcon/></IconButton>
            </div>)
    }

    render() {
        this.schedules_list = this.state.schedules_list;
        if (typeof this.state.schedules_list === 'undefined') {
            this.schedules_list = []
        }
        let elements = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let items = []
        let current;
        for (const [index, value] of elements.entries()) {
            items.push(<TableCell style={table_heading} align="center">{value} <AddSchedule
                dayNumber={index + 1} day={value}/></TableCell>)
        }
        return (<div>
                <SideNavigation/>
                <TableContainer component={Paper}>
                    <Table className="table" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {items}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {numbers.map((num) => (
                                <TableRow style={row_style} key={"weekdays"}>
                                    {this.weekdays.map((day, dayIdx) => (
                                        // {current = this.getScheduleByDayAndNumber(dayIdx, num)}
                                        <TableCell align="center">
                                            <div style={table_item}>
                                                <div style={class_number_container}>
                                                    <div>
                                                        {this.getScheduleByDayAndNumber(dayIdx, num)?.$class?.number}
                                                    </div>
                                                </div>

                                                <div style={class_info_container}>
                                                    <div>
                                                        {this.renderTime(this.getScheduleByDayAndNumber(dayIdx, num)?.$class?.from, this.getScheduleByDayAndNumber(dayIdx, num)?.$class?.to)}
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <div>
                                                                {this.getScheduleByDayAndNumber(dayIdx, num)?.subject.name}
                                                            </div>
                                                            <div>
                                                                {this.getScheduleByDayAndNumber(dayIdx, num)?.classtype?.typeName}
                                                            </div>
                                                            <div>
                                                                {this.getScheduleByDayAndNumber(dayIdx, num)?.teacher.surname} {this.getScheduleByDayAndNumber(dayIdx, num)?.teacher.name} {this.getScheduleByDayAndNumber(dayIdx, num)?.teacher.middle_name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {this.renderMoreButton(dayIdx, num)}
                                                <Divider orientation="vertical" flexItem />
                                            </div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

const addbutton = {}
const table_item = {
    display: 'flex',
    justifyContent: 'space-between'
}

const more_button = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    cursor: 'pointer'
}
const class_number_container = {
    display: 'flex',
    flexDirection: 'column',
}
const row_style = {
    height:'133px'
}
const class_info_container = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}
const table_heading = {}
export default Schedule;