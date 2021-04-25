import {API_BASE_URL} from "../../constants/api"
import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import SubjectsList from "./SubjectsList";
class AddSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            new_name: undefined,
            error_message:'',
        }

    }
    handleClickOpen() {
        this.setState({open: true});
    };
    handleClose = () => {
        this.setState({open: false});
    };
    createSubject() {
        const payload = {
            "name": this.state.new_name
        };
        fetch(API_BASE_URL + '/subjects', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }).then(
            async response => {
                //this.props.fetchList();
                let res = await response.json();
                if (!res.success) {
                    this.setState(
                        {error_message: res.error.message}
                    )
                }
                this.props.fetchList();
            }
        );
        this.setState({open: false});
    }
    render() {
        console.log(this.state.open)
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
            </Dialog>
            </div>
        );
    }
}
const page_style = {
    'display': 'flex',
    'flex-direction': 'column',
}
const heading_style = {
    'display': 'flex',
    'flex-direction': 'row',
    'flex-wrap': 'wrap',
    'align-content': 'stretch'
};
const subjectsheading_style = {
    'margin-right': '20px'
}
export default AddSubject;
