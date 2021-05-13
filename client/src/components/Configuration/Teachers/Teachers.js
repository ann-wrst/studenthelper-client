import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import {API_BASE_URL} from "../../../constants/api"
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import AddTeacher from "./AddTeacher";
import EditTeacher from "./EditTeacher";
import DeleteTeacher from "./DeleteTeacher";
import EmptyStub from "../EmptyStub";
import history from './../../history'
import ErrorSnackbar from "../../ErrorSnackbar";
import TeacherServices from "../../../services/TeacherServices";

class Teachers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            teachers_list: []
        }
        this.fetchTeachersList = this.fetchTeachersList.bind(this);
    }

    async componentDidMount() {
        await this.fetchTeachersList();
    }

    async fetchTeachersList() {
        let res = await TeacherServices.fetchTeachersList();
        if (res?.success) {
            this.setState({teachers_list: res?.data})
        } else if (!res?.success) {
            this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
        }
    }

    rows = [];
    error;

    render() {
        this.rows = this.state.teachers_list || [];
        if (this.rows.length !== 0)
            return (<div style={page_style}>
                {this.error}
                <div style={heading_style}><Typography style={teachersheading_style} variant="h6">
                    Teachers
                </Typography>
                    <AddTeacher fetchList={this.fetchTeachersList}> </AddTeacher>
                    <TableContainer component={Paper}>
                        <Table className="table" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Surname</b></TableCell>
                                    <TableCell><b>Name</b></TableCell>
                                    <TableCell><b>Middle Name</b></TableCell>
                                    <TableCell align="right"> </TableCell>
                                    <TableCell align="left"> </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.rows.map((row) => (
                                    <TableRow key={row.idTeacher}>
                                        <TableCell component="th" scope="row">
                                            {row.surname}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row['middle name']}
                                        </TableCell>
                                        <TableCell align="left">
                                        </TableCell>

                                        <TableCell align="right">
                                            <div style={buttons_container}>
                                                <div style={edit_button}>
                                                    <EditTeacher id={row.idTeacher} surname={row.surname}
                                                                 name={row.name}
                                                                 middle_name={row['middle name']}
                                                                 fetchList={this.fetchTeachersList}>
                                                    </EditTeacher>
                                                </div>
                                                <DeleteTeacher id={row.idTeacher}
                                                               fetchList={this.fetchTeachersList}>
                                                </DeleteTeacher>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>)
        else return (<div>
                <div style={heading_style}>
                    <Typography style={teachersheading_style} variant="h6">
                        Teachers
                    </Typography>
                    <AddTeacher fetchList={this.fetchTeachersList}> </AddTeacher>
                </div>
                <EmptyStub name={"teachers"}/>
            </div>
        );
    }
}

const
    page_style = {
        'display': 'flex',
        'flex-direction': 'column',
    };

const
    heading_style = {
        'display': 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'wrap',
        'align-content': 'stretch'
    };
const
    teachersheading_style = {
        'margin-right': '20px'
    }
const
    buttons_container = {
        'display': 'flex',
        justifyContent: 'flex-end'
    }
const
    edit_button = {
        paddingRight: '5px'
    }
export default Teachers;