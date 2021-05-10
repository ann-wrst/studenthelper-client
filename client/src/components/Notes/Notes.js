import {API_BASE_URL} from "../../constants/api"
import React, {Component} from "react";
import SideNavigation from "../SideNavigation";
import {CKEditor} from '@ckeditor/ckeditor5-react/';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom'
import history from "../history";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import RadioButtonUncheckedSharpIcon from '@material-ui/icons/RadioButtonUncheckedSharp';
import ErrorSnackbar from "../ErrorSnackbar";
import {Typography} from "@material-ui/core";
import EmptyStub from "../Configuration/EmptyStub";

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects_list: undefined
        }
    }

    componentDidMount() {
        this.fetchSubjectList();
    }

    async fetchSubjectList() {
        fetch(API_BASE_URL + '/subjects', {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            async response => {
                if (response.status === 403)
                    history.push('/login');
                let res = await response.json();
                if (res?.success) {
                    this.setState({subjects_list: res?.data})
                } else if (!res?.success) {
                    this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
                }
                return res;
            }
        );
    }

    error;

    render() {
        let subjects = this.state.subjects_list;
        if (typeof subjects === 'undefined') subjects = []
        return (
            <div>
                {this.error}
                <SideNavigation/>
                <div>
                    <Typography variant="h5" gutterBottom style={heading_style}>Notes</Typography>
                    <Typography variant="body1" gutterBottom style={subheading_style}>You can create notes by subjects
                        here</Typography>
                    <Divider light/>
                    {subjects.length > 0 ?
                        subjects.map((subj) => (
                            <div>
                                <ListItem style={item_style} component={Link} to={{
                                    pathname: `/note/${subj.idSubject}`,
                                    state: {name: subj.name}
                                }} alignItems="flex-center" button>
                                    <div>
                                        <ListItemText>
                                            {subj.name}
                                        </ListItemText>
                                    </div>
                                </ListItem>
                                <Divider/>
                            </div>
                        ))
                        : <div><EmptyStub name="subjects"/> <Typography variant="body1" gutterBottom
                                                                        style={subheading_style}>Create subjects
                            here <Link to='/configuration' target="_blank" style={{textDecoration: 'none'}}
                                       rel="noopener noreferrer">Configuration</Link></Typography></div>

                    }
                </div>
            </div>);
    }

}

const item_style = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#1C1B1C',
    marginLeft: '5px'
}

const heading_style = {
    marginLeft: '20px',
    'margin-top': '10px',
}
const subheading_style = {
    marginLeft: '20px',
    fontStyle: 'italic',
    fontFamily: "'Source Sans Pro', sans-serif",
    fontSize: '20px'
}
export default Notes;
