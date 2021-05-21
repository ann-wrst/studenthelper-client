import React from 'react';
import {Button} from "@material-ui/core";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import pomodoroStyles from "./pomodoroStyles";

function BreakInterval(props) {
    function increaseCounter() {
        props.onBreakIntervalChange(props.breakInterval + 1);
    }

    function decreaseCounter() {
        const currentInterval = props.breakInterval;

        if (currentInterval === 0) {
            return;
        }

        props.onBreakIntervalChange(currentInterval - 1);
    }

    return (
        <section style={pomodoroStyles.Interval}>
            <span style={pomodoroStyles.IntervalText}>Break Length</span>
            <section style={pomodoroStyles.Counter}>
                <Button disabled={props.isPlay ? "disabled" : ""}
                        onClick={decreaseCounter}>
                    <RemoveIcon/>
                </Button>

                <p style={pomodoroStyles.IntervalText}>{props.breakInterval}</p>
                <Button disabled={props.isPlay ? "disabled" : ""}
                        onClick={increaseCounter}>
                    <AddIcon/>
                </Button>
            </section>
        </section>
    )
}

export default BreakInterval;