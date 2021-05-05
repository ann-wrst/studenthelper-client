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
        console.log(subjects);
        return (
            <div>
                {this.error}
                <SideNavigation/>
                <div>
                    {/*You can create notes by subjects here*/}
                    {subjects.map((subj) => (
                        <div>
                            <ListItem style={item_style} alignItems="flex-center" button>
                                <div>
                                    <ListItemIcon>
                                        <RadioButtonUncheckedSharpIcon style={icon_style} size="small" light/>
                                    </ListItemIcon>
                                </div>
                                <div>
                                    {/*<ListItemText primary={<Link to={{pathname: `/notes/${subj.idSubject}`,state: {*/}
                                    {/*    fromNotifications: true*/}
                                    {/*}}/>} key={subj.idSubject}>*/}
                                    {/*</ListItemText>*/}
                                    <ListItemText>
                                        <Link
                                            to={{
                                                pathname: `/notes/${subj.idSubject}`,
                                                state: {name: subj.name}
                                            }}
                                        >{subj.name}</Link>
                                    </ListItemText>
                                </div>
                            </ListItem>
                            <Divider/>
                        </div>
                    ))
                    }
                </div>
            </div>);
    }
}

const item_style = {
    display: 'flex',
    alignItems: 'center'
}
const icon_style = {
    width: '15px',
    height: '15px'
}
export default Notes;
