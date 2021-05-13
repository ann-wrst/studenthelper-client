import React, {Component} from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {DialogContentText} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import ErrorSnackbar from "../ErrorSnackbar";
import DeadlineServices from "../../services/DeadlineServices";

class DeleteDeadline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.openDeleteModal = this.openDeleteModal.bind(this);
    }

    openDeleteModal() {
        this.setState({open: true});
    }

    handleClose = () => {
        this.setState({open: false});
    };

    error;

    async deleteDeadline(id) {
        let res = await DeadlineServices.deleteDeadlines(id);
        if (!res?.success) {
            this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
        } else {
            this.handleClose();
            this.props.fetchList();
            this.props.closeMenu();
        }
    }

    render() {
        return (
            <div>
                <MenuItem style={menu_item} key="delete"
                          onClick={this.openDeleteModal}>
                    Delete
                </MenuItem>
                {this.error}
                <Dialog open={this.state.open} onClose={() => this.handleClose()}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                        Delete
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Do you want to delete deadline?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={() => this.deleteDeadline(this.props.id)}
                            color="primary">
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>);
    }
}

const menu_item = {
    fontSize: '13px'
};

export default DeleteDeadline;