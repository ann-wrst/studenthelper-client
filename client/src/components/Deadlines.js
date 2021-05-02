import {API_BASE_URL} from "../constants/api"
import {Component} from "react";
import Calendar from './Calendar'
class Deadlines extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div><Calendar /></div>);
    }
}
export default Deadlines;
