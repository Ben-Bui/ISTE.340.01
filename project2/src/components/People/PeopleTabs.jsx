import { useState, useEffect } from 'react';
import getData from '../../util/GetData';
import PeopleGroup from './PeopleGroup';

const PeopleTabs = () => {
    //state
    const [people, setPeople] = useState();
    const [loaded, setLoaded] = useState(false);
    const [tab, setTab] = useState('faculty'); //simpler name

    //get people data
    useEffect(() => {
        getData('people/')
            .then((data) => {
                console.log('got people', data); //your debug style
                setPeople(data);
                setLoaded(true);
            });
    }, []);

    if (!loaded) return <div>Loading People...</div>;

    return (
        <section className="people-section">
            <h1>{people.title}</h1>
            <h3>{people.subTitle}</h3>
            
            {/* Simple tab buttons */}
            <div className="tab-buttons">
                <button 
                    className={tab === 'faculty' ? 'active' : ''}
                    onClick={() => setTab('faculty')}
                >
                    Faculty
                </button>
                <button 
                    className={tab === 'staff' ? 'active' : ''}
                    onClick={() => setTab('staff')}
                >
                    Staff
                </button>
            </div>
            
            {/* Tab content */}
            <div className="tab-content">
                {tab === 'faculty' && <PeopleGroup pepGroup={people.faculty} />}
                {tab === 'staff' && <PeopleGroup pepGroup={people.staff} />}
            </div>
        </section>
    );
};

export default PeopleTabs;