import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {DialogContentText} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

class DeleteSchedule extends Component {
    handleClickOpen() {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        return (
            <Dialog open={this.state.open} onClose={() => this.handleClose()}
                    aria-labelledby="form-dialog-title">
                <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                    Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to delete subject?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.handleClose()} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => this.deleteSchedule(this.props.id)}
                        color="primary">
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}