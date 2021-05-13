import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import AddSchedule from "./AddSchedule";
import SideNavigation from "../SideNavigation";
import Menu from '@material-ui/core/Menu';
import ErrorSnackbar from "../ErrorSnackbar";
import EditSchedule from "./EditSchedule";
import DeleteSchedule from "./DeleteSchedule";
import ScheduleServices from "../../services/ScheduleServices";

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedules_list: undefined,
            showEven: true,
            anchorEl: null,
            open: false,
            mouseX: null,
            mouseY: null,
        }
        this.fetchSchedules = this.fetchSchedules.bind(this);
        this.handleChangeSwitch = this.handleChangeSwitch.bind(this);
        this.handleContextClick = this.handleContextClick.bind(this);
    }

    async componentDidMount() {
        await this.fetchSchedules();
    }

    async fetchSchedules() {
        let res = await ScheduleServices.fetchSchedules();
        if (res?.success) {
            this.setState({schedules_list: res?.data})
        } else if (!res?.success) {
            this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
        }
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

    currentId;
    currentNum;
    currentWeekday;
    currentSubject;
    currentParity;
    currentTeacher;
    currentClassType;
    currentFrom;
    currentTo;


    renderParityLabel(actualParity) {
        if (actualParity)
            return (<i>even</i>);
        else if (!actualParity && typeof actualParity !== 'undefined') return (<i>odd</i>);
        else return null;
    }

    handleClickOpen() {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    handleCloseMenu = () => {
        this.setState({
            mouseX: null,
            mouseY: null,
        });
    };

    renderTeacher(surname, name, middleName) {
        let nameLetter = name ? name.charAt(0)?.concat(". ") : '';
        let middleNameLetter = middleName ? middleName.charAt(0)?.concat(". ") : '';
        return surname?.concat(' ', nameLetter, middleNameLetter);
    }

    renderSchedule(num, day, dayIdx) {
        if (!this.getScheduleByDayAndNumber(dayIdx, num)) {
            return (
                <div style={table_item}>
                </div>
            )
        }
        if (this.getScheduleByDayAndNumber(dayIdx, num)[0]?.parity == null) {
            return (
                <div
                    onContextMenu={(event) => this.handleContextClick(event, this.getScheduleByDayAndNumber(dayIdx, num)[0]?.idSchedule, this.getScheduleByDayAndNumber(dayIdx, num)[0]?.classtype?.idClassType, this.getScheduleByDayAndNumber(dayIdx, num)[0]?.$class?.from, this.getScheduleByDayAndNumber(dayIdx, num)[0]?.$class?.to, this.getScheduleByDayAndNumber(dayIdx, num)[0]?.$class?.number, this.getScheduleByDayAndNumber(dayIdx, num)[0]?.teacher?.idTeacher, this.getScheduleByDayAndNumber(dayIdx, num)[0]?.subject?.idSubject, this.getScheduleByDayAndNumber(dayIdx, num)[0]?.weekday, this.getScheduleByDayAndNumber(dayIdx, num)[0]?.parity)}
                    style={{cursor: 'context-menu',}}>
                    {
                        this.getScheduleByDayAndNumber(dayIdx, num)?.length > 0 ?
                            <div style={table_item}>
                                <div style={class_info_container}>
                                    <div style={subject_style}>
                                        {this.getScheduleByDayAndNumber(dayIdx, num)[0]?.subject?.name}
                                    </div>
                                    <div>
                                        {this.getScheduleByDayAndNumber(dayIdx, num)[0]?.classtype?.typeName}
                                    </div>
                                    <div style={teacher_style}>
                                        {this.renderTeacher(this.getScheduleByDayAndNumber(dayIdx, num)[0]?.teacher?.surname, this.getScheduleByDayAndNumber(dayIdx, num)[0]?.teacher?.name, this.getScheduleByDayAndNumber(dayIdx, num)[0]?.teacher['middle name'])}
                                    </div>
                                    <div>
                                        {this.renderTime(this.getScheduleByDayAndNumber(dayIdx, num)[0]?.$class?.from, this.getScheduleByDayAndNumber(dayIdx, num)[0]?.$class?.to)}
                                    </div>
                                </div>
                            </div> : null
                    }
                </div>
            );
        } else return (
            <div>
                {
                    <div>
                        {[1, 0].map((tf) =>
                            this.getScheduleByDayAndNumber(dayIdx, num, tf)?.length > 0 ?
                                <div
                                    onContextMenu={(event) => this.handleContextClick(event, this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.idSchedule, this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.classtype?.idClassType, this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.$class?.from, this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.$class?.to, this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.$class?.number, this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.teacher?.idTeacher, this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.subject?.idSubject, this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.weekday, this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.parity)}
                                    style={{cursor: 'context-menu',}}>
                                    <div style={class_info_container}>
                                        <div>
                                            {this.renderParityLabel(this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.parity)}
                                        </div>
                                        <div style={subject_style}>
                                            {this.getScheduleByDayAndNumber(dayIdx, num, tf)[0]?.subject?.name}
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
                                </div> : null
                        )}
                    </div>
                }
            </div>
        )
    }

    weekdayAbbreviation = {
        "Monday": "MON",
        "Tuesday": "TUE",
        "Wednesday": "WED",
        "Thursday": "THU",
        "Friday": "FRI",
        "Saturday": "SAT",
        "Sunday": "SUN"
    }

    handleContextClick(event, id, classtype, from, to, number, teacher, subject, day, parity) {
        [this.currentId, this.currentClassType, this.currentFrom, this.currentTo, this.currentNum, this.currentTeacher, this.currentSubject, this.currentWeekday, this.currentParity] = [id, classtype, from, to, number, teacher, subject, day, parity];
        event.preventDefault();
        this.setState({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
    }

    removeSeconds(time) {
        if (typeof time !== 'undefined') {
            return time.slice(0, -3);
        }
    }

    render() {
        this.schedules_list = this.state.schedules_list || [];

        let elements = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let items = [];
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
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                <TableRow style={row_style} key={num}>
                                    <TableCell style={num_style}>
                                        {num}
                                    </TableCell>
                                    {this.weekdays.map((day, dayIdx) => (
                                        <TableCell width="14.286%" align="center">
                                            {this.renderSchedule(num, day, dayIdx, this.state.showEven)}
                                        </TableCell>
                                    ))
                                    }
                                </TableRow>
                            ))}
                            <Menu
                                anchorPosition={
                                    this.state.mouseY !== null && this.state.mouseX !== null
                                        ? {top: this.state.mouseY, left: this.state.mouseX}
                                        : undefined
                                }
                                keepMounted
                                open={this.state.mouseY !== null}
                                onClose={this.handleCloseMenu}
                                anchorReference="anchorPosition"
                            >
                                <EditSchedule id={this.currentId} fetchList={this.fetchSchedules}
                                              closeMenu={this.handleCloseMenu} classNumber={this.currentNum}
                                              weekday={this.currentWeekday} subject={this.currentSubject}
                                              classType={this.currentClassType} teacher={this.currentTeacher}
                                              from={this.removeSeconds(this.currentFrom)}
                                              to={this.removeSeconds(this.currentTo)} parity={this.currentParity}/>

                                <DeleteSchedule id={this.currentId} fetchList={this.fetchSchedules}
                                                closeMenu={this.handleCloseMenu}/>
                            </Menu>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

const table_item = {}

const num_style = {
    fontWeight: 'bold',
    fontSize: '17px'
}
const row_style = {
    height: '133px',
    backgroundColor: '#FBFBFF',
}
const class_info_container = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '500',
    boxShadow: '0 2px 2px rgba(0,0,0,0.3)',
    borderRadius: '5px',
    backgroundColor: 'white',
    padding: '10px',
    minHeight: '150px'
};

const table_heading = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '600'
};
const subject_style = {
    fontWeight: '600'
};
const teacher_style = {};
export default Schedule;