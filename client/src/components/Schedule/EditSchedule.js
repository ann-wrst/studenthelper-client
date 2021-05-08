import {Component} from "react";
import {MenuItem} from "@material-ui/core";

class EditSchedule extends Component {
    constructor(props) {
        super(props);
        this.state={
            open: false,
            class_number: undefined,
            time_from: undefined,
            time_to: undefined,
            parity: 'true',
            parityDependent: false,
            subject: undefined,
            teacher: undefined,
            class_type: undefined,
            subjects_list: [],
            teachers_list: [],
            classtypes_list: []
        }
    }

    render() {
        return (<MenuItem>
            Edit
        </MenuItem>);
    }
}