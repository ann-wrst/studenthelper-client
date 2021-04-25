import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import React from "react";
import {API_BASE_URL} from "../../constants/api"
import {Component} from "react";
class DeleteButton extends Component {
    constructor(props) {
        super(props);
    }
    handleDelete(id) {
        fetch(API_BASE_URL + `/subjects/${id}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            async response => {
                let res = await response.json();
                if (!res.success && typeof res.error.message!=="undefined") {
                    this.setState(
                        {error_message: res.error.message}
                    )
                }
              this.props.fetchList();
            }
        );

    }
    render() {
        return (<Button variant="outlined" size="small"
                        color="secondary" primary={true} startIcon={<DeleteIcon/>}
                        onClick={(event) => this.handleDelete(this.props.id)}>
            Delete
        </Button>);
    }
}
export default DeleteButton;

