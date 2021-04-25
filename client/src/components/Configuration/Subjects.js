import React, {Component} from "react";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SubjectsList from "./SubjectsList";
import {API_BASE_URL} from "../../constants/api"
import AddSubject from "./AddSubject";

class Subjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            new_name: undefined,
            error_message: '',
            subjects_list: []
        }
        this.fetchSubjectList=this.fetchSubjectList.bind(this);
    };

    async fetchSubjectList() {
        let response= await (await fetch(API_BASE_URL + '/subjects', {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })).json();
        this.setState({subjects_list: response.data})
        return response;
        /*
        fetch(API_BASE_URL + '/subjects', {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            async response => {
                res = await response.json();
                if (res.success) {
                    this.setState({subjects_list: res.data})
                }
                return res;
            }
        );*/
    }

    render() {
        return (<div style={page_style}>
            <div style={heading_style}><Typography style={subjectsheading_style} variant="h6">
                Subjects
            </Typography>
                <AddSubject fetchList={this.fetchSubjectList}> </AddSubject>
                {console.log("state"+this.state.subjects_list)}
                <SubjectsList list={this.state.subjects_list}> </SubjectsList>

            </div>
        </div>);
    }
}

const page_style = {
    'display': 'flex',
    'flex-direction': 'column',
}
const heading_style = {
    'display': 'flex',
    'flex-direction': 'row',
    'flex-wrap': 'wrap',
    'align-content': 'stretch'
};
const subjectsheading_style = {
    'margin-right': '20px'
}
export default Subjects;
