import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import SubjectServices from "../../../services/SubjectServices";
import ErrorSnackbar from "../../ErrorSnackbar";
import configurationStyles from "../configurationStyles";
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

    async editSubject(id) {
        let res = await SubjectServices.editSubject(id, this.state.new_name);
        if (!res?.success) {
            this.error = <ErrorSnackbar open={true} message={res?.error?.message || res?.message}/>;
        }
        this.handleClose();
        this.props.fetchList();
    }

    render() {
        return (<div>
                {this.error}
                <Button style={configurationStyles.EditButton} variant="outlined" color="primary" primary={true}
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
                            label="Subject name"
                            defaultValue={this.props.name}
                            inputProps={{maxLength: 45}}
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
export default EditSubject;
