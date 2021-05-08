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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {DialogContentText} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ErrorSnackbar from "../ErrorSnackbar";
import {string} from "prop-types";

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedules_list: undefined,
            showEven: true,
            anchorEl: null,
            open: false
        }
        this.fetchSchedules = this.fetchSchedules.bind(this);
        this.handleChangeSwitch = this.handleChangeSwitch.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.fetchSchedules();
    }

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
                } else if (!res?.success) {
                    this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
                }
                return res;
            }
        );
    }

    error;

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

    renderMoreButton(day, number, id) {
        let temp = this.getScheduleByDayAndNumber(day, number)[0];
        if (temp) {
            return (<div style={more_button}>
                <IconButton size="small" aria-label="more"
                            onClick={(event) => this.handleMoreButtonClick(event, id)}><MoreVertIcon/></IconButton>

            </div>)
        }
    }

    deleteSchedule(id) {
        fetch(API_BASE_URL + `/schedules/${id}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            async response => {
                if (response.status === 403)
                    history.push('/login');
                let res = await response.json();
                if (res?.success) {
                    this.fetchSchedules();
                    this.setState({
                        anchorEl: null
                    })
                } else if (!res?.success) {
                    this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
                }
                this.handleClose();
                return res;
            }
        );
    }

    handleDelete() {
        this.setState({open: true});
    }

    renderParityLabel(actualParity) {
        if (actualParity)
            return (<i>even week</i>);
        else if (!actualParity && typeof actualParity !== 'undefined') return (<i>odd week</i>);
        else return null;
    }

    handleMoreButtonClick = (event, id) => {
        this.currentIdToDelete = id;
        this.setState({anchorEl: event.currentTarget});
    };

    handleClickOpen() {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    handleCloseMoreButton = () => {
        this.setState({anchorEl: null});
    };

    renderTeacher(surname, name, middleName) {
        let fullName = (name || '').concat(' ', middleName || '');
        return surname?.concat(' ', fullName.split(' ').map(x => x.charAt(0)).join('. ').toUpperCase());
    }

    renderSchedule(num, day, dayIdx) {
        let trfa = [1, 0];
        if (!this.getScheduleByDayAndNumber(dayIdx, num)) {
            return (
                <div style={table_item}>
                </div>
            )
        }
        if (this.getScheduleByDayAndNumber(dayIdx, num)[0]?.parity == null) {
            return (
                <div>
                    {
                        typeof this.getScheduleByDayAndNumber(dayIdx, num) !== 'undefined' ?
                            (<Card>
                                <CardContent>
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
                                                        {this.renderTeacher(this.getScheduleByDayAndNumber(dayIdx, num)[0]?.teacher?.surname, this.getScheduleByDayAndNumber(dayIdx, num)[0]?.teacher?.name, this.getScheduleByDayAndNumber(dayIdx, num)[0]?.teacher['middle name'])}
                                                    </div>
                                                    <div>
                                                        {this.renderTime(this.getScheduleByDayAndNumber(dayIdx, num)[0]?.$class?.from, this.getScheduleByDayAndNumber(dayIdx, num)[0]?.$class?.to)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {this.renderMoreButton(dayIdx, num, this.getScheduleByDayAndNumber(dayIdx, num)[0]?.idSchedule)}
                                        {/*<Divider orientation="vertical" flexItem/>*/}
                                    </div>
                                </CardContent>
                            </Card>) : <div> </div>
                    }
                </div>
            );
        } else return (
            <div>
                {
                    typeof this.getScheduleByDayAndNumber(dayIdx, num) !== 'undefined' ?
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
                                                        {this.renderTeacher(this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.teacher?.surname, this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.teacher?.name, this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.teacher['middle name'])}
                                                    </div>
                                                    <div>
                                                        {this.renderTime(this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.$class?.from, this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.$class?.to)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.parity != null ? this.renderMoreButton(dayIdx, num, this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.idSchedule) : ""}

                                    </div>
                                </div>
                            )}
                        </div> : null
                }
            </div>
        )
    }

    currentIdToDelete;
    weekdayAbbreviation = {
        "Monday": "MON",
        "Tuesday": "TUE",
        "Wednesday": "WED",
        "Thursday": "THU",
        "Friday": "FRI",
        "Saturday": "SAT",
        "Sunday": "SUN"
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
            items.push(<TableCell style={table_heading} align="center"> {this.weekdayAbbreviation[value.toString()]}
                <AddSchedule
                    dayNumber={index + 1} fetchSchedules={this.fetchSchedules} day={value}/></TableCell>)
        }
        return (<div>
                {this.error}
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
                            <Menu
                                id="simple-menu"
                                anchorEl={this.state.anchorEl}
                                keepMounted
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleCloseMoreButton}
                            >
                                <MenuItem style={menu_item} key="delete" selected={'Delete'}
                                          onClick={this.handleDelete}>
                                    Delete
                                </MenuItem>
                            </Menu>
                            <Divider orientation="vertical" flexItem/>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={this.state.open} onClose={() => this.handleClose()}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                        Delete
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Do you want to delete schedule?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={() => this.deleteSchedule(this.currentIdToDelete)}
                            color="primary">
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const table_item = {
    display: 'flex',
    justifyContent: 'space-evenly',
}
const inside_double = {
    display: 'flex'
}
const more_button = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    boxShadow: 'none'
}
const menu_item = {
    fontSize: '13px'
}
const num_style = {
    fontWeight: 'bold',
    fontSize: '17px'
}
const row_style = {
    height: '133px'
}
const class_info_container = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '400'
}

const table_heading = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '600'

}
export default Schedule;