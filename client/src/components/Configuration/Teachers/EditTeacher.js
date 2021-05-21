import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TeacherServices from "../../../services/TeacherServices";
import ErrorSnackbar from "../../ErrorSnackbar";
import configurationStyles from "../configurationStyles";

class EditTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            new_surname: undefined,
            new_name: undefined,
            new_middle_name: undefined,
        }
    }

    handleClickOpen() {
        this.setState({new_surname: this.props.surname});
        this.setState({new_name: this.props.name});
        this.setState({new_middle_name: this.props.middle_name});
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    async editTeacher(id) {
        let res = await TeacherServices.editTeacher(id, this.state.new_surname, this.state.new_name, this.state.new_middle_name);
        if (!res?.success) {
            this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
        }
        this.props.fetchList();
        this.handleClose();
    }

    error;

    render() {
        return (<div>
                {this.error}
                <Button style={configurationStyles.EditButton} variant="outlined" color="primary" primary={true}
                        onClick={() => this.handleClickOpen()}>
                    Edit
                </Button>
                <Dialog open={this.state.open} onClose={() => this.handleClose()} aria-labelledby="form-dialog-title">

                    <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Teacher surname"
                            defaultValue={this.props.surname}
                            fullWidth
                            inputProps={{maxLength: 45}}
                            onChange={(event) => this.setState({new_surname: event.target.value})}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Teacher name"
                            fullWidth
                            inputProps={{maxLength: 45}}
                            defaultValue={this.props.name}
                            onChange={(event) => this.setState({new_name: event.target.value})}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Teacher middle name"
                            fullWidth
                            inputProps={{maxLength: 45}}
                            defaultValue={this.props.middle_name}
                            onChange={(event) => this.setState({new_middle_name: event.target.value})}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.editTeacher(this.props.id)} color="primary">
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EditTeacher;