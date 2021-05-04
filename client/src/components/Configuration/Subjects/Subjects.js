import React, {Component} from "react";
import EditSubject from "./EditSubject";
import Typography from "@material-ui/core/Typography";
import DeleteButton from "./DeleteButton";
import {API_BASE_URL} from "../../../constants/api"
import AddSubject from "./AddSubject";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import EmptyStub from "../EmptyStub";
import history from "../../history";
import ErrorSnackbar from "../../ErrorSnackbar";

class Subjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            subjects_list: []
        }
        this.fetchSubjectList = this.fetchSubjectList.bind(this);
    };

    error;

    componentDidMount() {
        this.error = null;
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

    rows = [];

    render() {
        this.rows = this.state.subjects_list;
        if (typeof this.rows === "undefined")
            this.rows = [];
        if (this.rows.length !== 0)
            return (<div style={page_style}>
                {this.error}
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
                                            <div style={buttons_container}>
                                                <div style={edit_button}>
                                                    <EditSubject id={row.idSubject} name={row.name}
                                                                 fetchList={this.fetchSubjectList}>
                                                    </EditSubject>
                                                </div>
                                                <DeleteButton id={row.idSubject} fetchList={this.fetchSubjectList}>
                                                </DeleteButton>
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
                <Typography style={subjectsheading_style} variant="h6">
                    Subjects
                </Typography>
                <AddSubject fetchList={this.fetchSubjectList}> </AddSubject>
            </div>
            <EmptyStub name={"subjects"}/>
        </div>);
    }

}

const page_style = {
    'display': 'flex',
    'flex-direction': 'column',
};
const buttons_container = {
    'display': 'flex',
    justifyContent: 'flex-end'
}
const edit_button = {
    paddingRight: '5px'
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
