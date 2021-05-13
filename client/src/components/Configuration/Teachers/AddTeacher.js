import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TeacherServices from "../../../services/TeacherServices";
import ErrorSnackbar from "../../ErrorSnackbar";

class AddTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            new_surname: undefined,
            new_name: undefined,
            new_middle_name: undefined,
            error_message: '',
        }
    }

    handleClickOpen() {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    async createTeacher() {
        let res = await TeacherServices.addTeacher(this.state.new_surname, this.state.new_name, this.state.new_middle_name);
        if (!res?.success) {
            this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
        }
        this.props.fetchList();
        this.setState({new_name: ''});
        this.setState({new_surname: ''});
        this.setState({new_middle_name: ''});
        this.handleClose();
    }

    error;

    render() {
        return (<div>
            {this.error}
            <Button variant="outlined" color="primary" primary={true} startIcon={<AddIcon/>}
                    onClick={() => this.handleClickOpen()}>
                Add
            </Button>
            <Dialog open={this.state.open} onClose={() => this.handleClose()} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Add</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Teacher surname"
                        fullWidth
                        onChange={(event) => this.setState({new_surname: event.target.value})}
                    />
                    <TextField

                        margin="dense"
                        id="name"
                        label="Teacher name"
                        fullWidth
                        onChange={(event) => this.setState({new_name: event.target.value})}
                    />
                    <TextField

                        margin="dense"
                        id="name"
                        label="Teacher middle name"
                        fullWidth
                        onChange={(event) => this.setState({new_middle_name: event.target.value})}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => this.handleClose()} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.createTeacher()} color="primary">
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </div>);
    }
}

export default AddTeacher;
