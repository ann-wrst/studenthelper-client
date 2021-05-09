import {API_BASE_URL} from "../../../constants/api"
import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import ErrorSnackbar from "../../ErrorSnackbar";
import history from "../../history";

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
        this.error = null;
    };

    editClassType(id) {
        const payload = {
            "typeName": this.state.type
        };
        fetch(API_BASE_URL + `/classtypes/${id}`, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }).then(
            async response => {
                if (response.status === 403)
                    history.push('/login');
                let res = await response.json();
                if (!res?.success) {
                    this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
                }
                this.props.fetchList();
            }
        );
        this.setState({open: false});

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
                    {console.log(this.props.type)}
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
