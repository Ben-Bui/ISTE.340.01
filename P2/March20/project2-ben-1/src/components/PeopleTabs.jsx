import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function PeopleTabs() {
  return (
    <Tabs
      defaultActiveKey="fac"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="fac" title="Faculty">
        Tab content for Faculty
      </Tab>
      <Tab eventKey="profile" title="Staff">
        Tab content for Staff
      </Tab>

    </Tabs>
  );
}

export default PeopleTabs;