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
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import DeleteIcon from "@material-ui/icons/Delete";
import {DialogContentText} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";

class Subjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            new_name: undefined,
            error_message: '',
            subjects_list: []
        }
        this.fetchSubjectList = this.fetchSubjectList.bind(this);
    };

    componentDidMount() {
        this.fetchSubjectList();
    }

    handleClickOpen(id) {
        this.setState({open: true});
        this.currentID = id;
        this.added = false;
    };

    handleClose = () => {
        this.setState({open: false});
        this.currentID = undefined;
    };

    async fetchSubjectList() {
        let response = await (await fetch(API_BASE_URL + '/subjects', {
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

    rows = [];

    createData(name) {
        return {name};
    }

    handleEdit(id, name) {
        const payload = {
            "name": name
        };
        console.log(id);
        fetch(API_BASE_URL + `/subjects/${id}`, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload
        }).then(
            async response => {
                let res = await response.json();
                if (!res.success) {
                    this.setState(
                        {error_message: res.error.message}
                    )
                } else return res.data;
            }
        );
    }

    async handleDelete(id) {
        fetch(API_BASE_URL + `/subjects/${id}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            async response => {
                let res = await response.json();
                if (!res?.success && typeof res?.error?.message !== "undefined") {
                    this.setState(
                        {error_message: res?.error?.message}
                    )
                }
                this.handleClose();
                this.added = true;

                await this.fetchSubjectList();
            }
        );
    }

    render() {
        this.rows = this.state.subjects_list;
        return (<div style={page_style}>
            <div style={heading_style}><Typography style={subjectsheading_style} variant="h6">
                Subjects
            </Typography>
                <AddSubject fetchList={this.fetchSubjectList}> </AddSubject>
                {console.log(this.state.subjects_list)}
                <TableContainer component={Paper}>
                    <Table className="table" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right"> </TableCell>
                                <TableCell align="right"> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.rows.map((row) => (
                                <TableRow key={row.idSubject}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">

                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant="outlined" color="primary" primary={true} style={edit_style}
                                                size="small"
                                                onClick={(event) => this.handleEdit(row.idSubject)}>
                                            Edit
                                        </Button>
                                        {/*<DeleteButton id={row.idSubject} fetchList={this.fetchSubjectList}>*/}
                                        {/*</DeleteButton>*/}
                                        <Button variant="outlined" size="small"
                                                color="secondary" primary={true} startIcon={<DeleteIcon/>}
                                                onClick={(event) => this.handleClickOpen(row.idSubject)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <Dialog open={this.state.open} onClose={() => this.handleClose()}
                                    aria-labelledby="form-dialog-title">
                                <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                                    Delete
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Do you want to delete subject?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => this.handleClose()} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={() => this.handleDelete(this.currentID)}
                                            color="primary">
                                        Done
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </TableBody>
                    </Table>
                </TableContainer>
                {/*<SubjectsList list={this.state.subjects_list}> </SubjectsList>*/}

            </div>
        </div>);
    }
}

const page_style = {
    'display': 'flex',
    'flex-direction': 'column',
};

const edit_style = {
    'margin-right': '4px'
};
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
