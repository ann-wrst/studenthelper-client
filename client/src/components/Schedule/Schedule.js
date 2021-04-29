import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';


function Schedule() {
    return (<div>
        <TableContainer component={Paper}>
            <Table className="table" aria-label="simple table">
                <TableHead>
                    <TableRow style={row_style}>
                        <TableCell style={table_heading} align="center">Monday <IconButton size="small"
                                                                                           style={addbutton}><AddIcon/>
                        </IconButton></TableCell>
                        <TableCell style={table_heading} align="center">Tuesday <IconButton size="small"
                                                                                            style={addbutton}><AddIcon/>
                        </IconButton></TableCell>
                        <TableCell style={table_heading} align="center">Wednesday <IconButton size="small"
                                                                                              style={addbutton}><AddIcon/>
                        </IconButton></TableCell>
                        <TableCell style={table_heading} align="center">Thursday <IconButton size="small"
                                                                                             style={addbutton}><AddIcon/>
                        </IconButton></TableCell>
                        <TableCell style={table_heading} align="center">Friday <IconButton size="small"
                                                                                           style={addbutton}><AddIcon/>
                        </IconButton></TableCell>
                        <TableCell style={table_heading} align="center">Saturday <IconButton size="small"
                                                                                             style={addbutton}><AddIcon/>
                        </IconButton></TableCell>
                        <TableCell style={table_heading} align="center">Sunday <IconButton size="small"
                                                                                           style={addbutton}><AddIcon/>
                        </IconButton></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={"weekdays"}>
                        <TableCell align="center">
                            <div style={table_item}>
                                <div style={class_number_container}>
                                    <div>
                                        1
                                    </div>
                                </div>
                                <div style={class_info_container}>
                                    <div>
                                        08:30 - 11:00
                                    </div>
                                    <div>
                                        <div>
                                            <div>
                                                Algebra
                                            </div>
                                            <div>
                                                Lection
                                            </div>
                                            <div>
                                                Korobova
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={more_button}>
                                    <IconButton size="small"><MoreVertIcon/></IconButton>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell align="center">
                            <div style={table_item}>
                                <div style={class_number_container}>
                                    <div>
                                        1
                                    </div>
                                </div>
                                <div style={class_info_container}>
                                    <div>
                                        08:30 - 11:00
                                    </div>
                                    <div>
                                        <div>
                                            <div>
                                                Algebra
                                            </div>
                                            <div>
                                                Lection
                                            </div>
                                            <div>
                                                Korobova
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={more_button}>
                                    <IconButton size="small"><MoreVertIcon/></IconButton>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell align="center">
                            <div style={table_item}>
                                <div style={class_number_container}>
                                    <div>
                                        1
                                    </div>
                                </div>
                                <div style={class_info_container}>
                                    <div>
                                        08:30 - 11:00
                                    </div>
                                    <div>
                                        <div>
                                            <div>
                                                Algebra
                                            </div>
                                            <div>
                                                Lection
                                            </div>
                                            <div>
                                                Korobova
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={more_button}>
                                    <IconButton size="small"><MoreVertIcon/></IconButton>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell align="center">
                            <div style={table_item}>
                                <div style={class_number_container}>
                                    <div>
                                        1
                                    </div>
                                </div>
                                <div style={class_info_container}>
                                    <div>
                                        08:30 - 11:00
                                    </div>
                                    <div>
                                        <div>
                                            <div>
                                                Algebra
                                            </div>
                                            <div>
                                                Lection
                                            </div>
                                            <div>
                                                Korobova
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={more_button}>
                                    <IconButton size="small"><MoreVertIcon/></IconButton>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell align="center">
                            <div style={table_item}>
                                <div style={class_number_container}>
                                    <div>
                                        1
                                    </div>
                                </div>
                                <div style={class_info_container}>
                                    <div>
                                        08:30 - 11:00
                                    </div>
                                    <div>
                                        <div>
                                            <div>
                                                Algebra
                                            </div>
                                            <div>
                                                Lection
                                            </div>
                                            <div>
                                                Korobova
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={more_button}>
                                    <IconButton size="small"><MoreVertIcon/></IconButton>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell align="center">
                            <div style={table_item}>
                                <div style={class_number_container}>
                                    <div>
                                        1
                                    </div>
                                </div>
                                <div style={class_info_container}>
                                    <div>
                                        08:30 - 11:00
                                    </div>
                                    <div>
                                        <div>
                                            <div>
                                                Algebra
                                            </div>
                                            <div>
                                                Lection
                                            </div>
                                            <div>
                                                Korobova
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={more_button}>
                                    <IconButton size="small"><MoreVertIcon/></IconButton>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell align="center">
                            <div style={table_item}>
                                <div style={class_number_container}>
                                    <div>
                                        1
                                    </div>
                                </div>
                                <div style={class_info_container}>
                                    <div>
                                        08:30 - 11:00
                                    </div>
                                    <div>
                                        <div>
                                            <div>
                                                Algebra
                                            </div>
                                            <div>
                                                Lection
                                            </div>
                                            <div>
                                                Korobova
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={more_button}>
                                    <IconButton size="small"><MoreVertIcon/></IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>

    </div>);
}

const addbutton = {}
const table_item = {
    display: 'flex',
    justifyContent: 'space-between'
}

const more_button = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    cursor: 'pointer'
}
const class_number_container = {
    display: 'flex',
    flexDirection: 'column',
    //  justifyContent: 'center'

}
const row_style = {
  //  display:'flex'
}
const class_info_container = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}
const table_heading = {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'space-evenly'
}
export default Schedule;