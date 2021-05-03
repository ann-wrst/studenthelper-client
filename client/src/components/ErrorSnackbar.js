import React, {Component} from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";

class ErrorSnackbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        }
    }

    Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open: false});
    };

    render() {
        console.log("here");
        return (
            <div>
                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose} message={this.props.message} />
            </div>
        );
    }
}

export default ErrorSnackbar;