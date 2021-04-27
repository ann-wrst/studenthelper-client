import Button from "@material-ui/core/Button";
import React from "react";
import {API_BASE_URL} from "../../../constants/api"
import {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {DialogContentText} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
class DeleteTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            error_message: '',
        }
    }
    handleClickOpen() {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleDelete(id) {
        fetch(API_BASE_URL + `/teachers/${id}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            async response => {
                let res = await response.json();
                if (!res?.success) {
                    this.setState(
                        {error_message: res?.error?.message}
                    )
                }
                this.props.fetchList();
            }
        );

    }
    render() {
        return (<div>
            <Button variant="outlined" size="small"
                    color="secondary" primary={true}
                    onClick={(event) => this.handleClickOpen()}>
                Delete
            </Button>
            <Dialog open={this.state.open} onClose={() => this.handleClose()}
                    aria-labelledby="form-dialog-title">
                <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
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