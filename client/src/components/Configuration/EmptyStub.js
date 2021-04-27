import React, {Component} from "react";

class EmptyStub extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div style={container_style}>
            <img style={icon_style} src={process.env.PUBLIC_URL + '/schoolsubject.svg'} alt=''/>
            <span style={text_style}> You have no {this.props.name} yet</span>
        </div>)
    }
}

const container_style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}
const icon_style = {
    height: '145px',
    width: '145px',
}
const text_style = {
    color: "#A6A1A9",
    fontWeight:'medium',
    fontSize:'20px'
}

export default EmptyStub;