import {API_BASE_URL} from "../constants/api"
import history from "../components/history";
import React from "react";

const SubjectServices = {
    fetchSubjectList: async () => {
        let response = await fetch(API_BASE_URL + '/subjects', {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 403)
            history.push('/login');
        return await response.json();
    },

    createSubject: async (name) => {
        const payload = {
            "name": name
        };
        let response = await fetch(API_BASE_URL + '/subjects', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        if (response.status === 403)
            history.push('/login');
        return await response.json();
    },

    deleteSubject: async (id) => {
        let response = await fetch(API_BASE_URL + `/subjects/${id}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 403)
            history.push('/login');
        return await response.json();
    },

    editSubject: async (id, name) => {
        const payload = {
            "name": name
        };
        let response = await fetch(API_BASE_URL + `/subjects/${id}`, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        if (response.status === 403)
            history.push('/login');
        return await response.json();
    }
};
export default SubjectServices;