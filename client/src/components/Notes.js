import {API_BASE_URL} from "../constants/api"
import {Component} from "react";
import SideNavigation from "./SideNavigation";
class Notes extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div><SideNavigation/> Notes here</div>);
    }
}
export default Notes;
