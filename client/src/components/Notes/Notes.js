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
                }
                return res;
            }
        );
    }

    render() {
        let subjects = this.state.subjects_list;
        if (typeof subjects === 'undefined') subjects = []
        console.log(subjects);
        return (
            <div>
                <SideNavigation/>
                <div>
                    {/*You can create notes by subjects here*/}
                    {subjects.map((subj) => (
                        <div>
                            <ListItem style={item_style} alignItems="flex-center" button component={Link}
                                      to={`/notes/${subj.idSubject}`}>
                                <div>
                                    <ListItemIcon>
                                        <RadioButtonUncheckedSharpIcon size="small" light/>
                                    </ListItemIcon>
                                </div>
                                <div>
                                    <ListItemText primary={subj.name} key={subj.idSubject}/>
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

export default Notes;
