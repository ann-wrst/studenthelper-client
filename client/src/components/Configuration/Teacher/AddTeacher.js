import {API_BASE_URL} from "../../../constants/api"
import {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
class AddTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            new_surname: undefined,
            new_name: undefined,
            new_middle_name: undefined,
            error_message: '',
        }
    }
    render() {
        return (<div>AddTeacher here</div>);
    }
}
export default AddTeacher;
