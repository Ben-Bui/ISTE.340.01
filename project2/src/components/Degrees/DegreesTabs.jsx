import { useState, useEffect } from 'react';
import getData from '../../util/GetData';
import DegreeCard from './DegreeCard';

const DegreesTabs = () => {
    //state
    const [degrees, setDegrees] = useState({ undergraduate: [], graduate: [] });
    const [loaded, setLoaded] = useState(false);
    const [tab, setTab] = useState('undergraduate');

    //get degrees data
    useEffect(() => {
        getData('degrees/')
            .then((data) => {
                console.log('got degrees', data);
                setDegrees(data);
                setLoaded(true);
            });
    }, []);

    if (!loaded) return <div>Loading Degrees...</div>;

    return (
        <section className="degrees-section">
            <h2>Degree Programs</h2>
            
            <div className="degree-tabs">
                <button 
                    className={tab === 'undergraduate' ? 'active' : ''}
                    onClick={() => setTab('undergraduate')}
                >
                    Undergraduate
                </button>
                <button
                    className={tab === 'graduate' ? 'active' : ''}
                    onClick={() => setTab('graduate')}
                >
                    Graduate
                </button>
            </div>

            <div className="degree-list">
                {degrees[tab].map(degree => (
                    <DegreeCard 
                        key={degree.degreeName}
                        title={degree.title}
                        description={degree.description}
                        concentrations={degree.concentrations}
                    />
                ))}
            </div>
        </section>
    );
};

export default DegreesTabs;