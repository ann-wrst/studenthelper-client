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

class AddSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            class_number: undefined,
            date_from: undefined,
            date_to: undefined,
            parity: false,
            subject: undefined,
            teacher: undefined,
            class_type: undefined,
        }
    }

    handleClickOpen() {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSubjects = (event) => {
        this.setState({subject: event.target.value})
    };
    handleTeacher = (event) => {
        this.setState({teacher: event.target.value})
    }
    handleClassType = (event) => {
        this.setState({class_type: event.target.value})
    }
    handleParity = (event) => {
        this.setState({parity: event.target.checked })
    }

    addSchedule() {

    }

    render() {
        return (<span><IconButton size="small" onClick={() => this.handleClickOpen()}><AddIcon/>
        </IconButton>
        <Dialog open={this.state.open} onClose={() => this.handleClose()} aria-labelledby="form-dialog-title">

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
                {console.log(this.state.date_from)}
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
                 <br/>
                {/*subjects dropdown*/}
                <FormControl style={dropdown_style}>
                    <InputLabel id="subject-select">Subject</InputLabel>
                    <Select
                        labelId="subject-select"
                        id="subject-select"
                        value={this.state.subject}
                        onChange={this.handleSubjects}
                    >
                      <MenuItem value={"id1"}>Ten</MenuItem>
                      <MenuItem value={"id2"}>Twenty</MenuItem>
                    </Select>
                 </FormControl>
                <br/>
                {/*teacher dropdown*/}
                <FormControl style={dropdown_style}>
                    <InputLabel id="teacher-select">Teacher</InputLabel>
                    <Select
                        labelId="teacher-select"
                        id="teacher-select"
                        value={this.state.teacher}
                        onChange={this.handleTeacher}
                    >
                      <MenuItem value={"id1"}>Ten</MenuItem>
                      <MenuItem value={"id2"}>Twenty</MenuItem>
                    </Select>
                 </FormControl>
                <br/>
                {/*class types dropdown*/}
                <FormControl style={dropdown_style}>
                    <InputLabel id="class-type-select">Class type</InputLabel>
                    <Select
                        labelId="class-type-select"
                        id="class-type-select"
                        value={this.state.class_type}
                        onChange={this.handleClassType}
                    >
                      <MenuItem value={"id1"}>Ten</MenuItem>
                      <MenuItem value={"id2"}>Twenty</MenuItem>
                    </Select>
                 </FormControl>
                <br/>
                   <FormControlLabel
                       control={
                           <Checkbox
                               checked={this.state.parity}
                               onChange={this.handleParity}
                               name="parity"
                               color="primary"
                           />
                       }
                       label="Depends on parity"
                   />
                   {/*if checked show dropdown?*/}
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
    width: '200px'
}
export default AddSchedule;