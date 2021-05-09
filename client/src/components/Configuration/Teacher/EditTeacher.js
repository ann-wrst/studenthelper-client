import {API_BASE_URL} from "../../../constants/api"
import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import ErrorSnackbar from "../../ErrorSnackbar";

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
        this.setState({new_surname:this.props.surname});
        this.setState({new_name:this.props.name});
        this.setState({new_middle_name:this.props.middle_name});
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
        this.error = null;
    };

    editTeacher(id) {
        const payload = {
            "surname": this.state.new_surname,
            "name": this.state.new_name,
            "middle_name": this.state.new_middle_name,
        };
        fetch(API_BASE_URL + `/teachers/${id}`, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }).then(
            async response => {
                let res = await response.json();
                if (!res?.success) {
                    this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
                }
                this.props.fetchList();
            }
        );
        this.handleClose();
    }
    error;
    render() {
        return (<div>
                {this.error}
                <Button style={edit_button} variant="outlined" color="primary" primary={true}
                        onClick={(event) => this.handleClickOpen()}>
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
                            onChange={(event) => this.setState({new_surname: event.target.value})}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Teacher name"
                            fullWidth
                            defaultValue={this.props.name}
                            onChange={(event) => this.setState({new_name: event.target.value})}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Teacher middle name"
                            fullWidth
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

const edit_button = {
    float: 'left',
    paddingTop: '2px',
    paddingBottom: '2px',
}

export default EditTeacher;