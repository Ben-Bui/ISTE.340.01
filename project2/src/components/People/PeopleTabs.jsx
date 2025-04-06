import { useState, useEffect } from 'react';
import getData from '../../util/GetData';
import PeopleGroup from './PeopleGroup';

const PeopleTabs = () => {
  const [people, setPeople] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('faculty'); // Default to faculty tab

  useEffect(() => {
    getData('people/')
      .then((data) => {
        setPeople(data);
        setLoaded(true);
      });
  }, []);

  if (!loaded) return <div>Loading People...</div>;

  return (
    <section className="people-section" id="people">
      <h1>{people.title}</h1>
      <h3>{people.subTitle}</h3>
      
      {/* Tab Navigation */}
      <div className="people-tabs">
        <button 
          className={`tab-button ${activeTab === 'faculty' ? 'active' : ''}`}
          onClick={() => setActiveTab('faculty')}
        >
          Faculty
        </button>
        <button 
          className={`tab-button ${activeTab === 'staff' ? 'active' : ''}`}
          onClick={() => setActiveTab('staff')}
        >
          Staff
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'faculty' && (
          <PeopleGroup title="Faculty" pepGroup={people.faculty} />
        )}
        {activeTab === 'staff' && (
          <PeopleGroup title="Staff" pepGroup={people.staff} />
        )}
      </div>
    </section>
  );
};

export default PeopleTabs;