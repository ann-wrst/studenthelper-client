import React, {Component} from "react";
import EditSubject from "./EditSubject";
import Typography from "@material-ui/core/Typography";
import DeleteSubject from "./DeleteSubject";
import AddSubject from "./AddSubject";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import EmptyStub from "../EmptyStub";
import SubjectServices from "../../../services/SubjectServices";
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
        let res = await SubjectServices.fetchSubjectList();
        if (res?.success) {
            this.setState({subjects_list: res?.data})
        } else if (!res?.success) {
            this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
        }
    }

    rows = [];

    render() {
        this.rows = this.state.subjects_list || [];
        if (this.rows.length !== 0)
            return (<div style={page_style}>
                {this.error}
                <div style={heading_style}><Typography style={subjectsheading_style} variant="h6">
                    Subjects
                </Typography>
                    <AddSubject fetchList={this.fetchSubjectList}> </AddSubject>
                    <TableContainer component={Paper}>
                        <Table className="table" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Name</b></TableCell>
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
                                                <DeleteSubject id={row.idSubject} fetchList={this.fetchSubjectList}>
                                                </DeleteSubject>
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
