import React, {Component} from "react";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Subjects from "./Subjects/Subjects";
import SideNavigation from "../SideNavigation";
import Teachers from "./Teachers/Teachers";
import Classtypes from "./Classtypes/Classtypes";
import configurationStyles from "./configurationStyles";

class Configuration extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <SideNavigation/>
            <Tabs style={configurationStyles.Tabs}>

                <TabList>
                    <Tab>Subjects</Tab>
                    <Tab>Teachers</Tab>
                    <Tab>Class types</Tab>
                </TabList>

                <TabPanel>
                    <Subjects/>
                </TabPanel>
                <TabPanel>
                    <Teachers/>
                </TabPanel>
                <TabPanel>
                    <Classtypes/>
                </TabPanel>
            </Tabs></div>);
    }
}

export default Configuration;