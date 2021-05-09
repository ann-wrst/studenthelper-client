import React from 'react';
import RemoveIcon from "@material-ui/icons/Remove";
import {Button} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

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
        <section style={session_interval}>
            <span style={text_style}>Session Length</span>
            <section style={counter_style}>
                <Button disabled={props.isPlay ? "disabled" : ""}
                        onClick={decreaseCounter}>
                    <RemoveIcon/>
                </Button>

                <p style={text_style}>{props.sessionInterval}</p>
                <Button disabled={props.isPlay ? "disabled" : ""}
                        onClick={increaseCounter}>
                    <AddIcon/>
                </Button>
            </section>
        </section>
    )
}

export default SessionInterval;

const session_interval = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column'
};
const counter_style = {
    display:'flex'
};
const text_style = {
    fontFamily: "'Open Sans', sans-serif",
    fontWeight: '700'
}