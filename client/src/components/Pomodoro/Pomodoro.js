import React from 'react';
// import '../ComponentStyles/App.css';
import BreakInterval from './BreakInterval';
import Timer from './Timer';
import SessionInterval from "./SessionInterval";
import SideNavigation from "../SideNavigation";

class Pomodoro extends React.Component {
    constructor() {
        super();

        this.state = {
            breakInterval: 5,
            sessionInterval: 25,
            timerMinute: 25,
            isPlay: false,
        }

        this.onBreakIntervalChange = this.onBreakIntervalChange.bind(this);
        this.onSessionIntervalChange = this.onSessionIntervalChange.bind(this);
        this.onTimerMinuteChange = this.onTimerMinuteChange.bind(this);
        this.onPlayChange = this.onPlayChange.bind(this);
        this.onResetTimer = this.onResetTimer.bind(this);
    }

    onPlayChange(isPlay) {
        this.setState({
            isPlay: isPlay
        })
    }

    onBreakIntervalChange(newBreakLength) {
        this.setState({
            breakInterval: newBreakLength
        })
    }

    onSessionIntervalChange(newSessionLength) {
        this.setState({
            sessionInterval: newSessionLength,
            timerMinute: newSessionLength
        })
    }

    onTimerMinuteChange(minuteChange) {
        this.setState({
            timerMinute: minuteChange
        })
    }

    onResetTimer() {
        this.setState({
            sessionInterval: 25,
            timerMinute: 25,
            breakInterval: 5
        })
    }

    render() {
        return (
            <main className="App">
                <SideNavigation/>
                <section>
                    <h2 style={title}>Pomodoro Clock</h2>

                    <Timer
                        sessionInterval={this.state.sessionInterval}
                        timerMinute={this.state.timerMinute}
                        onTimerMinuteChange={this.onTimerMinuteChange}
                        breakInterval={this.state.breakInterval}
                        onPlayChange={this.onPlayChange}
                        resetTimer={this.onResetTimer}
                    />
                    <section style={interval_container}>
                        <BreakInterval
                            onBreakIntervalChange={this.onBreakIntervalChange}
                            breakInterval={this.state.breakInterval}
                            isPlay={this.state.isPlay}
                        />
                        <SessionInterval
                            onSessionIntervalChange={this.onSessionIntervalChange}
                            sessionInterval={this.state.sessionInterval}
                            isPlay={this.state.isPlay}
                        />
                    </section>
                </section>
            </main>
        )
    }
}

export default Pomodoro;

const interval_container = {
    marginTop: '25px'
};

const title = {
    fontSize: '3rem',
    fontWeight: '400',
    letterSpacing: '2px',
    color: '#263646',
    marginBottom: 0,
    fontFamily: "'Raleway', sans-serif"
}