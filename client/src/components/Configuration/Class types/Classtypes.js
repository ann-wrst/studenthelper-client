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
import AddClassType from "./AddClassType";
import DeleteClassType from "./DeleteClassType";
import EditClassType from "./EditClassType";
import EmptyStub from "../EmptyStub";
import history from "../../history";

class Classtypes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            error_message: '',
            classtypes_list: [],
            isLoading: false
        }
        this.fetchClassTypesList = this.fetchClassTypesList.bind(this);
    }

    componentDidMount() {
        this.fetchClassTypesList();
    }

    async fetchClassTypesList() {
        fetch(API_BASE_URL + '/classtypes', {
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
                    this.setState({classtypes_list: res?.data})
                }
                return res;
            }
        );
    }


    rows = [];

    render() {
        this.rows = this.state.classtypes_list;
        //so the page won't crash on map() function
        if (typeof this.rows === "undefined") {
            this.rows = [];
        }
        if (this.rows.length !== 0)
            return (<div style={page_style}>
                <div style={heading_style}>
                    <Typography style={classtypesheading_style} variant="h6">
                        Class types
                    </Typography>
                    <AddClassType fetchList={this.fetchClassTypesList}> </AddClassType>
                    <TableContainer component={Paper}>

                        <Table className="table" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Type</TableCell>
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
                                            <EditClassType id={row.idClassType} type={row.typeName}
                                                           fetchList={this.fetchClassTypesList}>
                                            </EditClassType>
                                        </TableCell>

                                        <TableCell align="left">
                                            <DeleteClassType id={row.idClassType} fetchList={this.fetchClassTypesList}>

                                            </DeleteClassType>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>);
        else return (<div>
            <div style={heading_style}>
            <Typography style={classtypesheading_style} variant="h6">
                Class types
            </Typography>
            <AddClassType fetchList={this.fetchClassTypesList}> </AddClassType>
            </div>
            <EmptyStub name={"class types"}/>
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
const classtypesheading_style = {
    'margin-right': '20px'
}
export default Classtypes;
