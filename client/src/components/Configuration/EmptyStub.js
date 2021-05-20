import React, {Component} from "react";
import configurationStyles from "./configurationStyles";

class EmptyStub extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div style={configurationStyles.StubContainer}>
            <img style={configurationStyles.StubIcon} src={process.env.PUBLIC_URL + '/schoolsubject.svg'} alt=''/>
            <span style={configurationStyles.StubText}> You have no {this.props.name} yet</span>
        </div>)
    }
}

export default EmptyStub;