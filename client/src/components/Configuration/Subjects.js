import React, {Component} from "react";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SubjectsList from "./SubjectsList";

class Subjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            new_name: undefined
        }
    };

    handleClickOpen() {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        return (<div style={page_style}>
            <div style={heading_style}><Typography style={subjectsheading_style} variant="h6">
                Subjects
            </Typography>
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
                            //дропдаун с выбором препода - не делать, в бд они вроде не связаны
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>
                <SubjectsList></SubjectsList>
            </div>
        </div>);
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
export default Subjects;
