import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import AddClassType from "./AddClassType";
import DeleteClassType from "./DeleteClassType";
import EditClassType from "./EditClassType";
import EmptyStub from "../EmptyStub";
import ClassTypeServices from "../../../services/ClassTypeServices";
import ErrorSnackbar from "../../ErrorSnackbar";
import configurationStyles from "../configurationStyles";

class Classtypes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            classtypes_list: [],
        }
        this.fetchClassTypesList = this.fetchClassTypesList.bind(this);
    }

    async componentDidMount() {
        await this.fetchClassTypesList();
    }

    async fetchClassTypesList() {
        let res = await ClassTypeServices.fetchClassTypesList();
        if (res?.success) {
            this.setState({classtypes_list: res?.data})
        } else if (!res?.success) {
            this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
        }
    }

    error;
    rows = [];

    renderClassTypes() {
        return (<div style={configurationStyles.Page}>
            {this.error}
            <div style={configurationStyles.GeneralHeading}>
                <Typography style={configurationStyles.SpecificHeading} variant="h6">
                    Class types
                </Typography>
                <AddClassType fetchList={this.fetchClassTypesList}> </AddClassType>
            </div>
                <TableContainer component={Paper}>

                    <Table className="table" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Type</b></TableCell>
                                <TableCell align="right"> </TableCell>
                                <TableCell align="left"> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.rows.map((row) => (
                                <TableRow key={row.idClassType}>
                                    <TableCell component="th" scope="row">
                                        {row.typeName}
                                    </TableCell>

                                    <TableCell align="left">

                                    </TableCell>

                                    <TableCell align="right">
                                        <div style={configurationStyles.ButtonsContainer}>
                                            <div style={configurationStyles.EditButtonContainer}>
                                                <EditClassType id={row.idClassType} type={row.typeName}
                                                               fetchList={this.fetchClassTypesList}>
                                                </EditClassType>
                                            </div>
                                            <DeleteClassType id={row.idClassType}
                                                             fetchList={this.fetchClassTypesList}>
                                            </DeleteClassType>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </div>);
    }

    renderEmptyStub() {
        return (<div>
            <div style={configurationStyles.GeneralHeading}>
                <Typography style={configurationStyles.SpecificHeading} variant="h6">
                    Class types
                </Typography>
                <AddClassType fetchList={this.fetchClassTypesList}> </AddClassType>
            </div>
            <EmptyStub name={"class types"}/>
        </div>);
    }

    render() {
        this.rows = this.state.classtypes_list || [];
        if (this.rows.length !== 0)
            return this.renderClassTypes()
        else return this.renderEmptyStub()
    }
}

export default Classtypes;
