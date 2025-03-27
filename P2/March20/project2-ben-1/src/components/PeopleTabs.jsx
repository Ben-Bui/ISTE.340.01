import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import PeopleGroup from './PeopleGroup';

function PeopleTabs() {
  return (
    <Tabs
      defaultActiveKey="fac"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="fac" title="Faculty">
        <PeopleGroup/ >
      </Tab>
      <Tab eventKey="profile" title="Staff">
        <PeopleGroup/>
      </Tab>

    </Tabs>
  );
}

export default PeopleTabs;