import {API_BASE_URL} from "../constants/api"
import history from "../components/history";
import React from "react";

const TeacherServices = {
    fetchTeachersList: async () => {
        let response = await fetch(API_BASE_URL + '/teachers', {
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
    addTeacher: async (surname, name, middleName) => {
        const payload = {
            "surname": surname,
            "name": name,
            "middle_name": middleName
        };
        let response = await fetch(API_BASE_URL + '/teachers', {
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

    deleteTeacher: async (id) => {
        let response = await fetch(API_BASE_URL + `/teachers/${id}`, {
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

    editTeacher: async (id, surname, name, middleName) => {
        const payload = {
            "surname": surname,
            "name": name,
            "middle_name": middleName
        };
        let response = await fetch(API_BASE_URL + `/teachers/${id}`, {
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
export default TeacherServices;