import React from 'react';
import RemoveIcon from "@material-ui/icons/Remove";
import {Button} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import pomodoroStyles from "./pomodoroStyles";

// import '../ComponentStyles/SessionInterval.css';

function SessionInterval(props) {

    function increaseCounter() {
        const currentInterval = props.sessionInterval;

        if (currentInterval >= 60) {
            return;
        }
        props.onSessionIntervalChange(props.sessionInterval + 1);
    }

    function decreaseCounter() {
        const currentInterval = props.sessionInterval;

        if (currentInterval === 0) {
            return;
        }

        props.onSessionIntervalChange(currentInterval - 1);
    }

    return (
        <section style={pomodoroStyles.Interval}>
            <span style={pomodoroStyles.IntervalText}>Session Length</span>
            <section style={pomodoroStyles.Counter}>
                <Button disabled={props.isPlay ? "disabled" : ""}
                        onClick={decreaseCounter}>
                    <RemoveIcon/>
                </Button>

                <p style={pomodoroStyles.IntervalText}>{props.sessionInterval}</p>
                <Button disabled={props.isPlay ? "disabled" : ""}
                        onClick={increaseCounter}>
                    <AddIcon/>
                </Button>
            </section>
        </section>
    )
}

export default SessionInterval;
