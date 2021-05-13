import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import ClassTypeServices from "../../../services/ClassTypeServices";
import ErrorSnackbar from "../../ErrorSnackbar";

class EditClassType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            type: undefined,
        }
    }

    handleClickOpen() {
        this.setState({type: this.props.type});
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    async editClassType(id) {
        let res = await ClassTypeServices.editClassType(id, this.state.type);
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
                <Button style={edit_button} variant="outlined" color="primary" primary={true}
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
                            label="Class type name"
                            defaultValue={this.props.type}
                            fullWidth
                            onChange={(event) => this.setState({type: event.target.value})}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.editClassType(this.props.id)} color="primary">
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

export default EditClassType;
