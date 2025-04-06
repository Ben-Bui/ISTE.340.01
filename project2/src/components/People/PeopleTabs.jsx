import { useState, useEffect } from 'react';
import getData from '../../util/GetData';
import PeopleGroup from './PeopleGroup';

const PeopleTabs = () => {
  const [people, setPeople] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getData('people/')
      .then((data) => {
        setPeople(data);
        setLoaded(true);
      });
  }, []);

  if (!loaded) return <div>Loading People...</div>;

  return (
    <section className="people-section">
      <h1>{people.title}</h1>
      <h3>{people.subTitle}</h3>
      
      <PeopleGroup title="Faculty" pepGroup={people.faculty} />
      <PeopleGroup title="Staff" pepGroup={people.staff} />
    </section>
  );
};

export default PeopleTabs;