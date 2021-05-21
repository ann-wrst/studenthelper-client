import React from 'react';
import {Button} from "@material-ui/core";
import pomodoroStyles from "./pomodoroStyles";

class Timer extends React.Component {
    constructor() {
        super()

        this.state = {
            timerSeconds: 0,
            intervalId: '',
            isSessionInterval: true
        }

        this.playStopTimer = this.playStopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }

    playStopTimer(event, action) {
        switch (action) {
            case 'play':
                this.props.onPlayChange(true);
                this.decreaseTimer();
                break;
            case 'stop':
                this.props.onPlayChange(false);
                clearInterval(this.state.intervalId);
                break;
            default:
                break;
        }
    }

    decreaseTimer() {
        let intervalId = setInterval(() => {
            switch (this.state.timerSeconds) {
                case 0:
                    if (this.props.timerMinute === 0) {
                        if (this.state.isSessionInterval) {
                            // start break timer
                            this.setState({
                                isSessionInterval: false
                            })

                            this.props.onTimerMinuteChange(this.props.breakInterval);
                        } else {
                            // start session timer
                            this.setState({
                                isSessionInterval: true
                            })

                            this.props.onTimerMinuteChange(this.props.sessionInterval);
                        }
                    } else {
                        this.props.onTimerMinuteChange(this.props.timerMinute - 1);
                        this.setState({
                            timerSeconds: 59
                        })
                    }
                    break;
                default:
                    this.setState({
                        timerSeconds: this.state.timerSeconds - 1
                    })
                    break;
            }
        }, 1000);

        this.setState({
            intervalId: intervalId
        });
    }

    resetTimer() {
        clearInterval(this.state.intervalId);

        this.props.resetTimer();
        this.props.onPlayChange(false);

        this.setState({
            timerSeconds: 0
        })
    }

    render() {
        return (
            <section>
                <section style={pomodoroStyles.SessionContainer}>
                    <h4 style={pomodoroStyles.SessionHeader}>{this.state.isSessionInterval ? 'Session' : 'Break'}</h4>
                    <span style={pomodoroStyles.Timer}
                    >
          {this.props.timerMinute}</span>
                    <span style={pomodoroStyles.Colon}
                          id="colon">:</span>
                    <span style={pomodoroStyles.Timer}
                    >{this.state.timerSeconds === 0 ? '00' : this.state.timerSeconds < 10 ? '0' + this.state.timerSeconds : this.state.timerSeconds}</span>
                </section>
                <section>
                    <Button variant="contained" color="primary" size="large" style={pomodoroStyles.Buttons}
                            onClick={(event) => this.playStopTimer(event, "play")}>Start</Button>
                    <Button variant="contained" color="primary" style={pomodoroStyles.Buttons} size="large"
                            onClick={(event) => this.playStopTimer(event, "stop")}>Stop</Button>
                    <Button variant="outlined" style={pomodoroStyles.Buttons} color="primary" size="large"
                            onClick={this.resetTimer}>Refresh</Button>
                </section>
            </section>
        )
    }
}

export default Timer;

