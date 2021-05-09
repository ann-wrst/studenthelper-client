import React from 'react';
import {Button} from "@material-ui/core";
// import '../ComponentStyles/SessionActions.css';
// import '../ComponentStyles/Timer.css';

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
                <section style={session_container}>
                    <h4 style={session_header}>{this.state.isSessionInterval ? 'Session' : 'Break'}</h4>
                    <span style={timer_style}
                    >
          {this.props.timerMinute}</span>
                    <span style={colon_style}
                          id="colon">:</span>
                    <span style={timer_style}
                    >{this.state.timerSeconds === 0 ? '00' : this.state.timerSeconds < 10 ? '0' + this.state.timerSeconds : this.state.timerSeconds}</span>
                </section>
                <section>
                    <Button variant="contained" color="primary" size="large" style={buttons}
                            onClick={(event) => this.playStopTimer(event, "play")}>Start</Button>
                    <Button variant="contained" color="primary" style={buttons} size="large"
                            onClick={(event) => this.playStopTimer(event, "stop")}>Stop</Button>
                    <Button variant="outlined" style={buttons} color="primary" size="large"
                            onClick={this.resetTimer}>Refresh</Button>
                </section>
            </section>
        )
    }
}

export default Timer;

const session_header = {
    color: '#3e3d46',
    marginTop: '20px',
    paddingTop:'20px',
    fontFamily: "'Karla', sans-serif",
    fontSize: '25px',
    marginBottom: '75px'
};
const session_container = {
    border: '5px solid #31369B',
    boxShadow: '0 2px 10px rgba(0,0,0,0.40)',
    width: '400px',
    height:'400px',
    margin: '25px auto',
    borderRadius: '100%',
};
const buttons = {
    // display:'flex',
    marginLeft: '25px'

}
const colon_style = {
    fontSize: '6rem',
    color: '#3e3d46',
    fontWeight: '400',
    position: 'relative',
    bottom: '7px',
    margin: '0 8px'
}
const timer_style = {
    margin: '0 0 20px 0',
    fontSize: '6rem',
    color: '#3e3d46',
    fontWeight: '400'
}