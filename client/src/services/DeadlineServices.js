import {API_BASE_URL} from "../constants/api"
import history from "../components/history";
import React from "react";

const DeadlineServices = {
    addTask: async (task, subject, date) => {
        const payload = {
            "task": task,
            "subjectId": subject,
            "date": date,
            "isDone": false
        };
        let response = await fetch(API_BASE_URL + '/deadlines', {
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
    handleCheck: async (id, isDone) => {
        const payload = {
            "isDone": isDone
        };
        let response = await fetch(API_BASE_URL + `/deadlines/${id}`, {
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
    },

    fetchDeadlines: async () => {
        let response = await fetch(API_BASE_URL + '/deadlines', {
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

    deleteDeadlines: async (id) => {
        let response = await fetch(API_BASE_URL + `/deadlines/${id}`, {
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

    editTask: async (id, task, subject, date, isDone) => {
        const payload = {
            "task": task,
            "subjectId": subject,
            "date": date,
            "isDone": isDone
        };
        let response = await fetch(API_BASE_URL + `/deadlines/${id}`, {
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

export default DeadlineServices;