import Button from "@material-ui/core/Button";
import React from "react";
import {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {DialogContentText} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import TeacherServices from "../../../services/TeacherServices";
import ErrorSnackbar from "../../ErrorSnackbar";

class DeleteTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    handleClickOpen() {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    async handleDelete(id) {
        let res = await TeacherServices.deleteTeacher(id);
        if (!res?.success) {
            this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
        }
        this.handleClose();
        this.props.fetchList();
    }

    error;

    render() {
        return (<div>
            {this.error}
            <Button variant="outlined" size="small"
                    color="secondary" primary={true}
                    onClick={() => this.handleClickOpen()}>
                Delete
            </Button>
            <Dialog open={this.state.open} onClose={() => this.handleClose()}>
                <DialogTitle style={{cursor: 'move'}} id="dialog-title">
                    Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to delete teacher?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.handleClose()} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.handleDelete(this.props.id)}
                            color="primary">
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </div>);
    }

}

export default DeleteTeacher;