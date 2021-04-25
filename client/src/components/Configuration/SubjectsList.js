import {Component} from "react";
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import {API_BASE_URL} from "../../constants/api";
import DeleteButton from "./DeleteButton";

class SubjectsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects_list: []
        }
        this.fetchSubjectList=this.fetchSubjectList.bind(this);
    }

    componentDidMount() {
        this.fetchSubjectList();
    }

    fetchSubjectList() {
        fetch(API_BASE_URL + '/subjects', {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            async response => {
                let res = await response.json();
                if (res.success) {
                    this.setState({subjects_list: res.data})
                }
            }
        );
    }

    // renderSubjectsList() {
    //     let res = this.getSubjectsList();
    //     //  let res = [{id: "1", name: "math"}, {id: "2", name: "algebra"}]
    //     let subject_names = []
    //     for (let i = 0; i < res.length; i++) {
    //         subject_names[i] = res[i].name;
    //     }
    //     console.log(subject_names);
    //     let subject_namesJson = [];
    //     for (let i = 0; i < subject_names.length; i++) {
    //         subject_namesJson[i] = this.createData(subject_names[i]);
    //     }
    //     this.rows = subject_namesJson;
    // }

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

    handleDelete(id) {
        fetch(API_BASE_URL + `/subjects/${id}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            async response => {
                let res = await response.json();
                if (!res.success && typeof res.error.message !== "undefined") {
                    this.setState(
                        {error_message: res.error.message}
                    )
                }
                this.fetchSubjectList();
            }
        );

    }

    render() {
        let rows;
        console.log("HERE");
        console.log(this.props.list);
        console.log(this.state.subjects_list);
        if (this.props.list.length === 0)
            rows = this.state.subjects_list;
        else rows = this.props.list;
        console.log(rows);
        return (
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
                        {rows.map((row) => (
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
                                    <DeleteButton id={row.idSubject} fetchList={this.fetchSubjectList}>
                                    </DeleteButton>
                                    {/*<Button variant="outlined" size="small"*/}
                                    {/*        color="secondary" primary={true} startIcon={<DeleteIcon/>}*/}
                                    {/*        onClick={(event) => this.handleDelete(row.idSubject)}>*/}
                                    {/*    Delete*/}
                                    {/*</Button>*/}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

const edit_style = {
    'margin-right': '4px'
}
export default SubjectsList;
