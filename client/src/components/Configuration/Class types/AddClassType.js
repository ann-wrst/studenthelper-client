import {API_BASE_URL} from "../../../constants/api"
import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

class AddClassType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            type: undefined,
            error_message: '',
        }
    }

    handleClickOpen() {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    createClassType() {
        const payload = {
            "typeName": this.state.type
        };
        fetch(API_BASE_URL + '/classtypes', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
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
        this.setState({type: ''})
        this.setState({open: false});
    }

    render() {
        return (<div>
                <Button variant="outlined" color="primary" primary={true} startIcon={<AddIcon/>}
                        onClick={(event) => this.handleClickOpen()}>
                    Add
                </Button>
                <Dialog open={this.state.open} onClose={() => this.handleClose()} aria-labelledby="form-dialog-title">

                    <DialogTitle id="form-dialog-title">Add</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Class type name"
                            fullWidth
                            onChange={(event) => this.setState({type: event.target.value})}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.createClassType()} color="primary">
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}
export default AddClassType;