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
import configurationStyles from "../configurationStyles";
import {Divider} from "@material-ui/core";

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

    async componentDidMount() {
        this.error = null;
        await this.fetchSubjectList();
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

    renderSubjects() {
        return (<div style={configurationStyles.Page}>
            {this.error}
            <div style={configurationStyles.GeneralHeading}>
                <Typography style={configurationStyles.SpecificHeading}
                            variant="h6">
                    Subjects
                </Typography>
                <AddSubject fetchList={this.fetchSubjectList}> </AddSubject>
            </div>
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
                                    <div style={configurationStyles.ButtonsContainer}>
                                        <div style={configurationStyles.EditButtonContainer}>
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
        </div>)
    }

    renderEmptyStub() {
        return (<div>
            <div style={configurationStyles.GeneralHeading}>
                <Typography style={configurationStyles.SpecificHeading} variant="h6">
                    Subjects
                </Typography>
                <AddSubject fetchList={this.fetchSubjectList}> </AddSubject>
            </div>
            <EmptyStub name={"subjects"}/>
        </div>);
    }

    render() {
        this.rows = this.state.subjects_list || [];
        if (this.rows.length !== 0)
            return this.renderSubjects();
        else return this.renderEmptyStub();
    }


}

export default Subjects;
