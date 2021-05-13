import React, {Component} from "react";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import "react-datepicker/dist/react-datepicker.css";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {Link} from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ErrorSnackbar from "../ErrorSnackbar";
import SubjectServices from "../../services/SubjectServices";
import DeadlineServices from "../../services/DeadlineServices";

class AddDeadline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            task: '',
            subject: undefined,
            date: new Date(),
        }
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    error;
    subjects_list = [];

    handleClickOpen() {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({
            open: false, task: '',
            subject: undefined,
            date: new Date(),
        });
    };

    handleDateChange = (date) => {
        this.setState({date: date});
    }

    async fetchSubjectList() {
        let res = await SubjectServices.fetchSubjectList();
        if (res?.success) {
            this.subjects_list = res?.data;
        } else if (!res?.success) {
            this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
        }
    }


    handleSubjects = (event) => {
        this.setState({subject: event.target.value})
    };

    async addTask() {
        let res = await DeadlineServices.addTask(this.state.task, this.state.subject, this.state.date);
        if (!res?.success) {
            this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
        } else this.handleClose();
        this.props.fetchList();
    }

    showSubjectsDropdown() {
        this.subjects_list = this.props.subjects_list || [];
        let dropdown;
        if (this.subjects_list?.length === 0) {
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
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {this.subjects_list.map((subj) => (
                    <MenuItem value={subj.idSubject}>{subj.name}</MenuItem>
                ))}
            </Select>
        </FormControl>;
        return dropdown;
    }

    render() {
        return (<div><IconButton size="medium" aria-label="more"
                                 onClick={(event) => this.handleClickOpen(event)}><AddIcon/></IconButton>
            <div>
                <Dialog open={this.state.open} onClose={() => this.handleClose()} aria-labelledby="form-dialog-title">
                    {this.error}
                    <DialogTitle id="form-dialog-title">Add</DialogTitle>
                    <DialogContent style={{width: '400px', height: '350px'}}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            label="Task/deadline"
                            fullWidth
                            multiline
                            onChange={(event) => this.setState({task: event.target.value})}
                        />

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                disablePast
                                required
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Select date"
                                value={this.state.date}
                                size="small"
                                onChange={(date) => this.handleDateChange(date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        {this.showSubjectsDropdown()}
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.addTask()} color="primary">
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>);
    }
}

const dropdown_style = {
    width: '400px',
    marginTop: '10px',
    marginBottom: '10px'
};
export default AddDeadline;