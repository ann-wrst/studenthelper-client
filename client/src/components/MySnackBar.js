import React, {Component} from "react";
import Snackbar from '@material-ui/core/Snackbar';

class MySnackBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        }
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any) {
        this.setState({open: true})
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open: false});
    };

    render() {
        return (
            <div>
                <Snackbar open={this.state.open} autoHideDuration={1500} onClose={this.handleClose}
                          message={this.props.message}>
                </Snackbar>
            </div>
        );
    }
}

export default MySnackBar;