import {API_BASE_URL} from "../constants/api"
import history from "../components/history";
import React from "react";

const ScheduleServices = {
    addSchedule: async (number, from, to, subject, teacher, classType, parity, weekDay) => {
        const payload = {
            "$class": {
                "number": number,
                "from": from,
                "to": to,
            },
            "subjectId": subject,
            "teacherId": teacher,
            "classtypeId": classType,
            "parity": parity,
            "weekdayId": weekDay
        };
        let response = await fetch(API_BASE_URL + '/schedules', {
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

    deleteSchedule: async (id) => {
        let response = await fetch(API_BASE_URL + `/schedules/${id}`, {
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

    editSchedule: async (id, number, from, to, subject, teacher, classType, parity, weekDay) => {
        const payload = {
            "$class": {
                "number": number,
                "from": from,
                "to": to,
            },
            "subjectId": subject,
            "teacherId": teacher,
            "classtypeId": classType,
            "parity": parity,
            "weekdayId": weekDay
        };

        let response = await fetch(API_BASE_URL + `/schedules/${id}`, {
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

    fetchSchedules: async () => {
        let response = await fetch(API_BASE_URL + '/schedules', {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 403)
            history.push('/login');
        return await response.json();
    }
}
export default ScheduleServices;