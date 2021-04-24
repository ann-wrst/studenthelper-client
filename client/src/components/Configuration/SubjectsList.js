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

import * as rows from "react-bootstrap/ElementChildren";

class SubjectsList extends Component {

    constructor(props) {
        super(props);
    }

    rows = [
        this.createData('Frozen yoghurt'),
        this.createData('Ice cream sandwich'),
        this.createData('Eclair'),
        this.createData('Cupcake'),
        this.createData('Gingerbread'),
    ];

    createData(name, calories, fat) {
        return {name};
    }


    render() {
        console.log(this.rows);
        return (
            <TableContainer component={Paper}>
                <Table className="table" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">

                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" color="primary" primary={true} style={edit_style} size="small"
                                            onClick={(event) => this.handleClick()}>
                                        Edit
                                    </Button>
                                    <Button variant="outlined" size="small"
                                            color="secondary" primary={true} startIcon={<DeleteIcon/>}
                                            onClick={(event) => this.handleClick()}>
                                        Delete
                                    </Button>
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
    'margin-right':'4px'
}
export default SubjectsList;
