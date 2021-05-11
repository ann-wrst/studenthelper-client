import {API_BASE_URL} from "../constants/api"
import history from "../components/history";
import ErrorSnackbar from "../components/ErrorSnackbar";
import React from "react";

const ClassTypeServices = {
    fetchClassTypesList: async () => {
        let response = await fetch(API_BASE_URL + '/classtypes', {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 403) {
            history.push('/login');
        }
        return await response.json();
    },

    createClassType: async (typeName) => {
        const payload = {
            "typeName": typeName
        };
        let response = await fetch(API_BASE_URL + '/classtypes', {
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

    deleteClassType: async (id) => {
        let response = await fetch(API_BASE_URL + `/classtypes/${id}`, {
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

    editClassType: async (id, name) => {
        const payload = {
            "typeName": name
        }
        let response = await fetch(API_BASE_URL + `/classtypes/${id}`, {
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
}
export default ClassTypeServices;

