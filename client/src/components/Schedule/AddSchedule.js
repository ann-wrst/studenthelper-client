import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {API_BASE_URL} from "../../constants/api";
import history from "../history";
import {Link} from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
class AddSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            class_number: undefined,
            date_from: undefined,
            date_to: undefined,
            parity: true,
            parityDependent: false,
            subject: undefined,
            teacher: undefined,
            class_type: undefined,
            subjects_list: this.props.subjects,
            teachers_list: this.props.teachers,
            classtypes_list: this.props.classtypes
        }
    }

    async fetchSubjectList() {
        console.log('in fetch');
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
                    this.setState({subjects_list: res?.data})
                }
                return res;
            }
        );
    }

    async fetchTeachersList() {
        fetch(API_BASE_URL + '/teachers', {
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
                    this.setState({teachers_list: res?.data})
                }
                return res;
            }
        );
    }

    async fetchClassTypesList() {
        fetch(API_BASE_URL + '/classtypes', {
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
                    this.setState({classtypes_list: res?.data})
                }
                return res;
            }
        );
    }

    async handleClickOpen() {
        this.setState({open: true});
        await this.fetchClassTypesList();
        await this.fetchSubjectList();
        await this.fetchTeachersList()
    };

    handleClose = () => {
        this.setState({
            open: false, class_number: undefined, date_from: undefined,
            date_to: undefined,
            parity: false,
            subject: undefined,
            teacher: undefined,
            class_type: undefined,
        });
    };
    subjects_list = [];
    teachers_list = [];
    classtypes_list = [];
    handleSubjects = (event) => {
        this.setState({subject: event.target.value})
    };
    handleTeacher = (event) => {
        this.setState({teacher: event.target.value})
    }
    handleClassType = (event) => {
        this.setState({class_type: event.target.value})
    }
    handleParityDependent = (event) => {
        this.setState({parityDependent: event.target.checked})
    }

    showSubjectsDropdown() {
        let dropdown;
        if (this.subjects_list.length === 0) {
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
                {this.subjects_list.map((subj) => (
                    <MenuItem value={subj.idSubject}>{subj.name}</MenuItem>
                ))}
            </Select>
        </FormControl>;
        return dropdown;
    }

    showTeachersDropdown() {
        let dropdown;
        if (this.teachers_list.length === 0) {
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
                {this.teachers_list.map((teach) => (
                    <MenuItem value={teach.idTeacher}>{teach?.surname + ' '}</MenuItem>
                ))}
            </Select>
        </FormControl>;
        return dropdown;
    }

    showClassTypesDropdown() {
        let dropdown;
        if (this.classtypes_list.length === 0) {
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
                {this.classtypes_list.map((ct) => (
                    <MenuItem value={ct.idClassType}>{ct?.typeName + ' '}</MenuItem>
                ))}
            </Select>
        </FormControl>;
        return dropdown;
    }

    handleParity(event) {
        this.setState({parity: event.target.value})
    }
    showParity() {
        let radio;
        if (this.state.parityDependent) {
            radio = <div><FormLabel component="legend">Parity</FormLabel>
                <RadioGroup aria-label="parity" name="parity" value={this.state.parity} onChange={()=>this.handleParity()}>
                    <FormControlLabel value={true} control={<Radio/>} label="Even"/>
                    <FormControlLabel value={false} control={<Radio/>} label="Odd"/>
                </RadioGroup></div>
        }
        return radio;
    }

    addSchedule() {

    }

    render() {
        this.subjects_list = this.state.subjects_list;
        this.teachers_list = this.state.teachers_list;
        this.classtypes_list = this.state.classtypes_list;
        if (typeof this.state.subjects_list == "undefined")
            this.subjects_list = [];
        if (typeof this.state.teachers_list == "undefined")
            this.teachers_list = [];
        if (typeof this.state.classtypes_list == "undefined")
            this.classtypes_list = [];
        return (<span><IconButton size="small" onClick={() => this.handleClickOpen()}><AddIcon/>
                    </IconButton>
                    <Dialog open={this.state.open} onClose={() => this.handleClose()}
                            aria-labelledby="form-dialog-title">

                    <DialogTitle id="form-dialog-title">Add</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="number"
                        label="Class number"
                        fullWidth
                        onChange={(event) => this.setState({class_number: event.target.value})}
                    />

                    <TextField style={dropdown_style}
                               id="time"
                               label="Date from"
                               type="time"
                               defaultValue="06:30"
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               inputProps={{
                                   step: 300, // 5 min
                               }}
                               onChange={(event) => this.setState({date_from: event.target.value})}
                    />
                    <br/>
                        {console.log(this.props.subjects)}

                        <TextField style={dropdown_style}
                                   id="time"
                                   label="Date to"
                                   type="time"
                                   defaultValue="07:00"
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                                   inputProps={{
                                       step: 300, // 5 min
                                   }}
                                   onChange={(event) => this.setState({date_to: event.target.value})}
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
                    <Button onClick={() => this.createSubject()} color="primary">
                    Done
                    </Button>
                    </DialogActions>
                    </Dialog></span>);
    }
}

const dropdown_style = {
    width: '552px',
    marginTop: '10px',
    marginBottom: '10px'
};
export default AddSchedule;