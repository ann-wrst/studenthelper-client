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
import AddClassType from "../Class types/AddClassType";
import history from "../../history";

class Subjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            error_message: '',
            subjects_list: []
        }
        this.fetchSubjectList = this.fetchSubjectList.bind(this);
    };

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
                if(response.status===403)
                    history.push('/login');
                let res = await response.json();
                if (res?.success) {
                    this.setState({subjects_list: res?.data})
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
                                            <EditSubject id={row.idSubject} name={row.name}
                                                         fetchList={this.fetchSubjectList}>
                                            </EditSubject>
                                        </TableCell>

                                        <TableCell align="left">
                                            <DeleteButton id={row.idSubject} fetchList={this.fetchSubjectList}>
                                            </DeleteButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>)
        else return(<div>
            <div style={heading_style}>
                <Typography style={subjectsheading_style} variant="h6">
                    Subjects
                </Typography>
                <AddClassType fetchList={this.fetchClassTypesList}> </AddClassType>
            </div>
            <EmptyStub name={"subjects"}/>
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
const subjectsheading_style = {
    'margin-right': '20px'
}
export default Subjects;
