import {API_BASE_URL} from "../../../constants/api"
import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import ErrorSnackbar from "../../ErrorSnackbar";

class EditSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            new_name: undefined,
        }
    }

    componentDidMount() {
        this.error = null;
    }

    handleClickOpen() {
        this.setState({new_name: this.props.name})
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    error;

    editSubject(id) {
        const payload = {
            "name": this.state.new_name
        };
        fetch(API_BASE_URL + `/subjects/${id}`, {
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
                    this.error = <ErrorSnackbar open={true} message={res.error.message}/>;
                }
                this.setState({open: false});
                this.props.fetchList();
            }
        );
    }

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
                            label="Subject name"
                            defaultValue={this.props.name}
                            fullWidth
                            onChange={(event) => this.setState({new_name: event.target.value})}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.editSubject(this.props.id)} color="primary">
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

export default EditSubject;
