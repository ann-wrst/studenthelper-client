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
import AddSubject from "../Subjects/AddSubject";
import EditSubject from "../Subjects/EditSubject";
import DeleteButton from "../Subjects/DeleteButton";

class Teachers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            error_message: '',
            teachers_list: []
        }
      //  this.fetchTeachersList = this.fetchTeachersList.bind(this);
    }
    componentDidMount() {
        this.fetchTeachersList();


    }
    async fetchTeachersList() {
        console.log(1);

        let response = await (await fetch(API_BASE_URL + '/teachers', {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })).json();
        this.setState({teachers_list: response.data})
        return response;
    }
    rows = [];

    render() {
        this.rows = this.state.teachers_list;
        if (typeof this.rows === "undefined")
            this.rows = [];
        return (<div style={page_style}>
            <div style={heading_style}><Typography style={teachersheading_style} variant="h6">
                Subjects
            </Typography>
                {/*{<AddSubject fetchList={this.fetchTeachersList()}> </AddSubject>}*/}
                <TableContainer component={Paper}>
                    <Table className="table" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Surname</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Middle Name</TableCell>
                                <TableCell align="right"> </TableCell>
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
                                        {/*<EditTeacher id={row.idTeacher} name={row.name}*/}
                                        {/*             fetchList={this.fetchTeachersList}>*/}
                                        {/*</EditTeacher>*/}
                                    </TableCell>

                                    <TableCell align="left">
                                        {/*<DeleteButton id={row.idTeacher} fetchList={this.fetchSubjectList}>*/}
                                        {/*</DeleteButton>*/}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>);
    }
}
const page_style = {
    'display': 'flex',
    'flex-direction': 'column',
};

const heading_style = {
    'display': 'flex',
    'flex-direction': 'row',
    'flex-wrap': 'wrap',
    'align-content': 'stretch'
};
const teachersheading_style = {
    'margin-right': '20px'
}
export default Teachers;
