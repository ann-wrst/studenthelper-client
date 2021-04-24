import React, {Component} from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Subjects from "./Subjects";
import SideNavigation from "../SideNavigation";
class Configuration extends Component {
    constructor(props) {
        super(props);
    }
  render() {
        return(<div>
            <SideNavigation/>
            <Tabs style ={tabs_style}>

            <TabList>
                <Tab>Subjects</Tab>
                <Tab>Teachers</Tab>
                <Tab>Class types</Tab>
            </TabList>

            <TabPanel>
                <Subjects></Subjects>
            </TabPanel>
            <TabPanel>
                <h2>Teachers</h2>
            </TabPanel>
            <TabPanel>
                <h2>Class types</h2>
            </TabPanel>
        </Tabs></div>);
  }
}
const tabs_style = {
    'margin-left': '80px'
}
export default Configuration;
