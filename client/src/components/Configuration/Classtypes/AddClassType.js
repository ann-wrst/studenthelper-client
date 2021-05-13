import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import ClassTypeServices from "../../../services/ClassTypeServices";
import ErrorSnackbar from "../../ErrorSnackbar";

class AddClassType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            type: undefined,
        }
    }

    error;

    handleClickOpen() {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    async createClassType() {
        let res = await ClassTypeServices.createClassType(this.state.type);
        if (!res?.success) {
            this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
        }
        this.props.fetchList();
        this.setState({type: ''})
        this.handleClose();
    }

    render() {
        return (<div>
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
                {this?.error}

            </div>
        );
    }

}

export default AddClassType;