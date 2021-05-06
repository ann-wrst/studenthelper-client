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

class AddDeadline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            task: '',
            subject: undefined,
            date: undefined,
        }
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    error;

    handleClickOpen() {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
        this.error = null;
    };

    handleDateChange = (date) => {
        this.setState({date: date});
    }


    render() {
        return (<div><IconButton size="small" aria-label="more"
                                 onClick={(event) => this.handleClickOpen(event)}><AddIcon/></IconButton>
            <div style={modal_style}>
                <Dialog open={this.state.open} onClose={() => this.handleClose()} aria-labelledby="form-dialog-title">

                    <DialogTitle id="form-dialog-title">Add</DialogTitle>
                    <DialogContent style={{width: '500px', height: '500px'}}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Task/deadline"
                            fullWidth
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
                                onChange={(date)=>this.handleDateChange(date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        {/*select here*/}

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.createSubject()} color="primary">
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>);
    }
}

const modal_style = {
    height: '600px'
}
export default AddDeadline;