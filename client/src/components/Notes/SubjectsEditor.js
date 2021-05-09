import React, {Component} from "react";
import {CKEditor} from '@ckeditor/ckeditor5-react/';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic/';
import SideNavigation from "../SideNavigation";
import Button from "@material-ui/core/Button";
import {API_BASE_URL} from "../../constants/api";
import ErrorSnackbar from "../ErrorSnackbar";
import {Prompt} from "react-router";
import {IconButton, Typography} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import history from "../history";

class SubjectsEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idSubject: this.props.match.params.id,
            name: this.props.location.state?.name,
            data: '',
            label: ''
        }
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate = () => {
        if (this.currentContent !== this.data) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = undefined
        }
    }
    currentContent = '';

    getData() {
        fetch(API_BASE_URL + `/notes/${this.state.idSubject}`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            async response => {
                let res = await response.json();
                if (!res?.success) {
                    this.setState({error: <ErrorSnackbar open={true} message={res?.error?.message}/>});
                } else {
                    this.currentContent = res?.data?.content || '';
                    this.setState({data: res?.data?.content || ''});
                }
            }
        );
    }

    saveData(event, data) {
        this.setState({label: "Saving..."});
        const payload = {
            "content": data
        };
        fetch(API_BASE_URL + `/notes/${this.state.idSubject}`, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }).then(
            async response => {
                let res = await response.json();
                if (!res?.success) {
                    this.setState({error: <ErrorSnackbar open={true} message={res?.error?.message}/>, label: ''});
                } else if (res?.success) {
                    this.setState({label: "Saved"});
                    console.log(this.currentContent);
                    console.log(data);
                    this.currentContent = data;
                    this.forceUpdate();
                }
            }
        );
    }

    handleKeyDown(event, data) {
        let charCode = String.fromCharCode(event.which).toLowerCase();
        if (event.ctrlKey && charCode === 's') {
            event.preventDefault();
            this.saveData(event, data);
        }
    }

    data;
    error;

    render() {
        this.data = this.state.data;
        return (
            <>
                <Prompt
                    when={this.currentContent !== this.data}
                    message='You have unsaved changes, are you sure you want to leave?'
                />
                {
                    <div onKeyDown={(event) => this.handleKeyDown(event, this.data)}>
                        <SideNavigation/>
                        <div style={heading_style}>
                            <div style={{paddingRight: '10px'}}>
                                <IconButton onClick={history.goBack}><ArrowBackIosIcon/></IconButton>
                            </div>
                            <div>
                                <Typography variant="h5">{this.state.name}</Typography>
                            </div>
                        </div>
                        {this.state.error}
                        <CKEditor
                            editor={ClassicEditor}
                            data={this.state.data || ''}
                            onChange={(event, editor) => {
                                this.data = editor.getData();
                                this.setState({data: this.data})
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />

                        <div style={button_style}>
                            {this.state.label}
                            <Button variant="outlined" color="primary" primary={true}
                                    onClick={(event) => this.saveData(event, this.data)}>
                                Save changes
                            </Button>
                        </div>
                    </div>
                }
            </>
        );
    }

}

export default SubjectsEditor;
const button_style = {
    paddingLeft: '10px',
    paddingTop: '15px'
}

const heading_style = {
    'margin-left': '20px',
    'margin-top': '10px',
    'margin-bottom': '15px',
    display: 'flex',
    alignItems: 'center'
}
