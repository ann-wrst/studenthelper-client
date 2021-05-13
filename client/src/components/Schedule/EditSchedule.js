import React, {Component} from "react";
import {MenuItem} from "@material-ui/core";
import ErrorSnackbar from "../ErrorSnackbar";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {Link} from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import SubjectServices from "../../services/SubjectServices";
import TeacherServices from "../../services/TeacherServices";
import ClassTypeServices from "../../services/ClassTypeServices";
import ScheduleServices from "../../services/ScheduleServices";

class EditSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            class_number: undefined,
            time_from: undefined,
            time_to: undefined,
            parity: this.props.parity,
            parityDependent: false,
            subject: undefined,
            teacher: undefined,
            class_type: undefined,
            subjects_list: [],
            teachers_list: [],
            classtypes_list: []
        }
        this.handleParityDependent = this.handleParityDependent.bind(this);
    }

    async componentDidMount() {
        await Promise.all(
            [
                this.fetchClassTypesList(),
                this.fetchSubjectList(),
                this.fetchTeachersList()
            ]);
    }

    async fetchSubjectList() {
        let res = await SubjectServices.fetchSubjectList();
        if (res?.success) {
            this.setState({subjects_list: res?.data})
        } else if (!res?.success) {
            this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
        }
    }

    async fetchTeachersList() {
        let res = await TeacherServices.fetchTeachersList();
        if (res?.success) {
            this.setState({teachers_list: res?.data})
        } else if (!res?.success) {
            this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
        }
    }

    async fetchClassTypesList() {
        let res = await ClassTypeServices.fetchClassTypesList();
        if (res?.success) {
            this.setState({classtypes_list: res?.data})
        } else if (!res?.success) {
            this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
        }
    }

    handleSubjects = (event) => {
        this.setState({subject: event.target.value})
    };
    handleTeacher = (event) => {
        this.setState({teacher: event.target.value})
    };
    handleClassType = (event) => {
        this.setState({class_type: event.target.value})
    };

    showSubjectsDropdown() {
        let dropdown;
        if (this.state.subjects_list?.length === 0) {
            dropdown = <span><br/>No subjects. You can create subjects here <Link to='/configuration' target="_blank"
                                                                                  rel="noopener noreferrer">Configuration</Link><br/></span>;
        } else dropdown = <FormControl style={dropdown_style}>
            <InputLabel id="subject-select">Subject</InputLabel>
            <Select
                labelId="subject-select"
                id="subject-select"
                value={this.state.subject}
                onChange={this.handleSubjects}
            >
                {this.state.subjects_list.map((subj) => (
                    <MenuItem value={subj.idSubject}>{subj.name}</MenuItem>
                ))}
            </Select>
        </FormControl>;
        return dropdown;
    }

    getInitials(surname, name, middleName) {
        let nameLetter = name ? name.charAt(0)?.concat(". ") : '';
        let middleNameLetter = middleName ? middleName.charAt(0)?.concat(". ") : '';
        return surname?.concat(' ', nameLetter, middleNameLetter);
    }

    showTeachersDropdown() {
        let dropdown;
        if (this.state.teachers_list.length === 0) {
            dropdown = <span><br/>No teachers. You can create teacher here <Link to='/configuration'
                                                                                 target="_blank"
                                                                                 rel="noopener noreferrer">Configuration</Link><br/></span>;
        } else dropdown = <FormControl style={dropdown_style}>
            <InputLabel id="teacher-select">Teacher</InputLabel>
            <Select
                labelId="teacher-select"
                id="teacher-select"
                value={this.state.teacher}
                onChange={this.handleTeacher}
            >
                {this.state.teachers_list.map((teach) => (
                    <MenuItem
                        value={teach.idTeacher}>{this.getInitials(teach?.surname, teach?.name, teach['middle name'])}</MenuItem>
                ))}
            </Select>
        </FormControl>;
        return dropdown;
    }

    showClassTypesDropdown() {
        let dropdown;
        if (this.state.classtypes_list.length === 0) {
            dropdown =
                <span><br/>No class types. You can create class type here <Link to='/configuration' target="_blank"
                                                                                rel="noopener noreferrer">Configuration</Link><br/></span>;

        } else dropdown = <FormControl style={dropdown_style}>
            <InputLabel id="class-type-select">Class type</InputLabel>
            <Select
                labelId="class-type-select"
                id="class-type-select"
                value={this.state.class_type}
                onChange={this.handleClassType}
            >
                {this.state.classtypes_list.map((ct) => (
                    <MenuItem value={ct.idClassType}>{ct?.typeName + ' '}</MenuItem>
                ))}
            </Select>
        </FormControl>;
        return dropdown;
    }

    async handleClickOpen() {
        this.setState({open: true,});
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    error;

    openEdit() {
        this.setState({
            open: true,
            class_number: this.props.classNumber,
            time_from: this.props.from,
            time_to: this.props.to,
            parity: this.props.parity,
            subject: this.props.subject,
            teacher: this.props.teacher,
            class_type: this.props.classType,
        });

        let newParity = Boolean(this.props.parity).toString();
        if (this.props.parity === null) {
            this.setState({parityDependent: false});
        } else {
            this.setState({parity: newParity, parityDependent: true});
        }

        this.props.closeMenu();
    }

    removeSeconds(time) {
        if (typeof time !== 'undefined') {
            return time.slice(0, -3);
        }
    }

    async editSchedule() {
        let parity;
        if (!this.state.parityDependent) parity = null;
        else {
            if (this.state.parity === 'true') parity = true;
            if (this.state.parity === 'false') parity = false;
        }
        let res = await ScheduleServices.editSchedule(this.props.id, this.state.class_number, this.state.time_from, this.state.time_to, this.state.subject, this.state.teacher, this.state.class_type, parity, this.props.weekday?.idWeekday);

        if (!res?.success) {
            this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
        } else this.handleClose();

        this.props.fetchList();
    }

    handleParity = event => {
        this.setState({parity: event.target.value});
    };

    showParity() {
        if (this.state.parityDependent)
            return <div><FormLabel component="legend">Parity</FormLabel>
                <RadioGroup aria-label="parity" name="parity" value={this.state.parity} onChange={this.handleParity}>
                    <FormControlLabel value={"true"} control={<Radio color="primary"/>} label="Even"/>
                    <FormControlLabel value={"false"} control={<Radio color="primary"/>} label="Odd"/>
                </RadioGroup></div>;
    }

    handleParityDependent(event) {
        this.setState({parityDependent: event.target.checked});
    }

    render() {
        return (<><MenuItem style={menu_item} selected={'Edit'} onClick={(event) => this.openEdit(event)}>
                Edit
            </MenuItem>
                <Dialog open={this.state.open} onClose={() => this.handleClose()}>
                    {this.error}
                    <DialogTitle>Edit ({this.props.weekday?.Weekday})</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="number"
                            type="number"
                            label="Class number"
                            defaultValue={this.props.classNumber}
                            fullWidth
                            onChange={(event) => this.setState({class_number: event.target.value})}
                        />

                        <TextField style={dropdown_style}
                                   id="time"
                                   label="Date from"
                                   type="time"
                                   defaultValue={this.props.from}
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                                   inputProps={{
                                       step: 300,
                                   }}
                                   onChange={(event) => this.setState({time_from: event.target.value})}
                        />
                        <TextField style={dropdown_style}
                                   id="time"
                                   label="Date to"
                                   type="time"
                                   defaultValue={this.props.to}
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                                   inputProps={{
                                       step: 300,
                                   }}
                                   onChange={(event) => this.setState({time_to: event.target.value})}
                        />
                        <div>
                            <div style={dropdown_style}>
                                {this.showSubjectsDropdown()}
                            </div>
                            <div style={dropdown_style}>
                                {this.showTeachersDropdown()}
                            </div>
                            <div style={dropdown_style}>
                                {this.showClassTypesDropdown()}
                            </div>
                        </div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.parityDependent}
                                    onChange={this.handleParityDependent}
                                    name="parity"
                                    color="primary"
                                />
                            }
                            label="Depends on parity"
                        />
                        {this.showParity()}
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.editSchedule()} color="primary">
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export default EditSchedule;
const menu_item = {
    fontSize: '13px'
};
const dropdown_style = {
    width: '552px',
    marginTop: '10px',
    marginBottom: '10px'
};