import {API_BASE_URL} from "../constants/api"
import {Component} from "react";
import Pomodoro from "./Pomodoro";
class Deadlines extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div><Pomodoro/></div>);
    }
}
export default Deadlines;
