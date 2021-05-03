import {API_BASE_URL} from "../../constants/api"
import React, {Component} from "react";
import SideNavigation from "../SideNavigation";
import {CKEditor} from '@ckeditor/ckeditor5-react/';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic/';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom'
import ListItemLink from '@material-ui/core/ListItem'
import history from "../history";
import TableCell from "@material-ui/core/TableCell";
import AddSchedule from "../Schedule/AddSchedule";
import Divider from "@material-ui/core/Divider";

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
//[{"idSubject":"2fc6e720-dc2c-4d37-a514-e2f2afd9a97c","name":"subj1","userId":"675001c1-89c0-4e9b-b12e-054a22d909a7"},{"idSubject":"3605e454-c80c-4559-bcf6-4cee4210d07d","name":"subj2","userId":"675001c1-89c0-4e9b-b12e-054a22d909a7"}]
        let items = []
        // for (const [index, value] of elements.entries()) {
        //     items.push(<TableCell align="center">{value} <AddSchedule
        //         dayNumber={index} day={value}/></TableCell>)
        // }
        return (
            <div>
                <SideNavigation/>
                <div>
                    {subjects.map((subj) => (
                        // <ListItemLink href={`/subjects/${subjects.idSubject}`}>
                        //     <ListItemText primary={subjects.name} />
                        // </ListItemLink>
                        <div>
                            <ListItem alignItems="flex-center" button component={Link} to={`/notes/${subj.idSubject}`}>
                                <ListItemText primary={subj.name} key={subj.idSubject}/>
                            </ListItem>
                            <Divider/>
                        </div>
                    ))
                    }

                    {/*You can create notes by subjects here*/}
                    {/*<CKEditor*/}
                    {/*    editor={ClassicEditor}*/}
                    {/*    data="<p>Start writing text...</p>"*/}
                    {/*    onReady={editor => {*/}
                    {/*        // You can store the "editor" and use when it is needed.*/}
                    {/*        console.log('Editor is ready to use!', editor);*/}
                    {/*    }}*/}
                    {/*    onChange={(event, editor) => {*/}
                    {/*        const data = editor.getData();*/}
                    {/*        console.log({event, editor, data});*/}
                    {/*    }}*/}
                    {/*    onBlur={(event, editor) => {*/}
                    {/*        console.log('Blur.', editor);*/}
                    {/*    }}*/}
                    {/*    onFocus={(event, editor) => {*/}
                    {/*        console.log('Focus.', editor);*/}
                    {/*    }}*/}
                    {/*/>*/}
                </div>
            </div>);
    }
}

export default Notes;
