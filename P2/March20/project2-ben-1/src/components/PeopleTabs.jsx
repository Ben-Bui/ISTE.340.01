import { useState, useEffect } from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import PeopleGroup from './PeopleGroup';

import getData from '../util/GetData';
import './People.css'

function PeopleTabs() {
  //state
  const [loaded, setLoaded] = useState(false);
  const [people, setPeople] = useState();

  useEffect( ()=>{
    getData('people/')
      .then((json)=>{
        setPeople(json);
        setLoaded(true);
      });
  }, [] );

  if(!loaded) return(<h1>...Loading People...</h1>)
  return (
    <>
    <h1>{people.title}</h1>
    <h3>{people.subtitle}</h3>
    
    <Tabs
      defaultActiveKey="fac"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="fac" title="Faculty">
        <PeopleGroup title={"Faculty"} pepGroup={people.faculty}/>
      </Tab>
      <Tab eventKey="profile" title="Staff">
        <PeopleGroup title={"Staff"} pepGroup={people.staff}/>
      </Tab>

    </Tabs>
    </>
  );
}

export default PeopleTabs;