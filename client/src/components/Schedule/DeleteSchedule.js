import React, {Component} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {DialogContentText} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MenuItem from "@material-ui/core/MenuItem";
import ErrorSnackbar from "../ErrorSnackbar";
import ScheduleServices from "../../services/ScheduleServices";

class DeleteSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
    }

    async deleteSchedule(id) {
        let res = await ScheduleServices.deleteSchedule(id);
        if (res?.success) {
            this.props.fetchList();
            this.handleClose();
            this.props.closeMenu();
        } else if (!res?.success) {
            this.error = <ErrorSnackbar open={true} message={res?.error?.message || res?.message}/>;
        }
        return res;
    }

    handleClickOpen() {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleDelete() {
        this.handleClickOpen();
    }

    error;

    render() {
        return (
            <>
                <MenuItem style={menu_item} key="delete"
                          onClick={this.handleDelete}>
                    Delete
                </MenuItem>

                <Dialog open={this.state.open} onClose={() => this.handleClose()}
                        aria-labelledby="form-dialog-title">

                    <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                        Delete
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Do you want to delete schedule?
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
                {this.error}
            </>
        );
    }
}

export default DeleteSchedule;
const menu_item = {
    fontSize: '13px'
}