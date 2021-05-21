import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import SubjectServices from "../../../services/SubjectServices";
import ErrorSnackbar from "../../ErrorSnackbar";

class AddSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            new_name: undefined,
            error: null
        }
    }

    handleClickOpen() {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    async createSubject() {
        let res = await SubjectServices.createSubject(this.state.new_name);
        if (!res?.success) {
            this.setState({error: <ErrorSnackbar open={true} message={res?.error?.message}/>});
        }
        this.handleClose();
        this.props.fetchList();
        this.setState({new_name: ''});
    }

    renderAddSubjectModal() {
        return (<Dialog open={this.state.open} onClose={() => this.handleClose()} aria-labelledby="form-dialog-title">

            <DialogTitle id="form-dialog-title">Add</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Subject name"
                    fullWidth
                    onChange={(event) => this.setState({new_name: event.target.value})}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={() => this.handleClose()} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => this.createSubject()} color="primary">
                    Done
                </Button>
            </DialogActions>
        </Dialog>)
    }

    render() {
        return (<div>
                <Button variant="outlined" color="primary" primary={true} startIcon={<AddIcon/>}
                        onClick={() => this.handleClickOpen()}>
                    Add
                </Button>
                {this.renderAddSubjectModal()}
                {this.state.error}
            </div>
        );
    }

}

export default AddSubject;
