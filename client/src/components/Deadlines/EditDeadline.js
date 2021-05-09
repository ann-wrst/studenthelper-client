import React, {Component} from "react";
import MenuItem from "@material-ui/core/MenuItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {Link} from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {API_BASE_URL} from "../../constants/api";
import history from "../history";
import ErrorSnackbar from "../ErrorSnackbar";

class EditDeadline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            task: this.props.task,
            subject: this.props.subject,
            date: this.props.date,
        }
        this.openEdit = this.openEdit.bind(this);
    }

    handleClose = () => {
        this.setState({open: false});
        this.error = null;
    };

    openEdit() {
        this.setState({
            open: true,
            task: this.props.task,
            subject: this.props.subject,
            date: this.props.date,
        });
        this.props.closeMenu();
    }

    handleSubjects = (event) => {
        this.setState({subject: event.target.value})
    };

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
                {this.subjects_list.map((subj) => (
                    <MenuItem value={subj.idSubject}>{subj.name}</MenuItem>
                ))}
            </Select>
        </FormControl>;
        return dropdown;
    }

    handleDateChange = (date) => {
        this.setState({date: date});
    }

    error;

    editTask() {
        const payload = {
            "task": this.state.task,
            "subjectId": this.state.subject,
            "date": this.state.date,
        };
        fetch(API_BASE_URL + `/deadlines/${this.props.id}`, {
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
                if (res?.success) {
                    this.setState({subjects_list: res?.data});
                    this.handleClose();
                } else if (!res?.success) {
                    this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
                }
                this.props.fetchList();
            }
        );
    }

    render() {
        return (
            <div>
                {this.error}
                <MenuItem style={menu_item} key="delete" selected={'Edit'}
                          onClick={this.openEdit}>
                    Edit
                </MenuItem>
                {this.error}
                <Dialog open={this.state.open} onClose={() => this.handleClose()}>
                    <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                    <DialogContent style={{width: '400px', height: '350px'}}>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Task/deadline"
                            fullWidth
                            multiline
                            defaultValue={this.state.task}
                            onChange={(event) => this.setState({task: event.target.value})}
                        />

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                disablePast
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
                        <Button onClick={() => this.editTask()} color="primary">
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EditDeadline;
const menu_item = {
    fontSize: '13px'
};
const dropdown_style = {
    width: '400px',
    marginTop: '10px',
    marginBottom: '10px'
};