import {API_BASE_URL} from "../constants/api"
import history from "../components/history";
import ErrorSnackbar from "../components/ErrorSnackbar";
import React from "react";

export async function fetchSubjectList() {
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


export async function fetchTeachersList() {
    fetch(API_BASE_URL + '/teachers', {
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
                this.setState({teachers_list: res?.data})
            } else if (!res?.success) {
                this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
            }
            return res;
        }
    );
}

export async function fetchClassTypesList() {
    fetch(API_BASE_URL + '/classtypes', {
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
                this.setState({classtypes_list: res?.data})
            } else if (!res?.success) {
                this.error = <ErrorSnackbar open={true} message={res?.error?.message}/>;
            }
            return res;
        }
    );
}


// export default [fetchSubjectList(), fetchClassTypesList(), fetchTeachersList()];