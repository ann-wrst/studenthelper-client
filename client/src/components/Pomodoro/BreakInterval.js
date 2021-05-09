import React from 'react';
import {Button} from "@material-ui/core";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

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
        <section style={break_interval}>
            <span style={text_style}>Break Length</span>
            <section style={counter_style}>
                <Button disabled={props.isPlay ? "disabled" : ""}
                        onClick={decreaseCounter}>
                    <RemoveIcon/>
                </Button>

                <p style={text_style}>{props.breakInterval}</p>
                <Button disabled={props.isPlay ? "disabled" : ""}
                        onClick={increaseCounter}>
                    <AddIcon/>
                </Button>
            </section>
        </section>
    )
}

export default BreakInterval;

const break_interval = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column'

};
const counter_style = {
    display:'flex'
}
const text_style = {
    fontFamily: "'Open Sans', sans-serif",
    fontWeight: '700'
}