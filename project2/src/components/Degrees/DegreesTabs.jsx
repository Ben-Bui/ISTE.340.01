import { useState, useEffect } from 'react';
import getData from '../../util/GetData';
import DegreeCard from './DegreeCard';

const DegreesTabs = () => {
  const [degrees, setDegrees] = useState({ undergraduate: [], graduate: [] });
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('undergraduate');

  useEffect(() => {
    getData('degrees/')
      .then((data) => {
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
          className={activeTab === 'undergraduate' ? 'active' : ''}
          onClick={() => setActiveTab('undergraduate')}
        >
          Undergraduate
        </button>
        <button
          className={activeTab === 'graduate' ? 'active' : ''}
          onClick={() => setActiveTab('graduate')}
        >
          Graduate
        </button>
      </div>

      <div className="degree-list">
        {degrees[activeTab].map(degree => (
          <DegreeCard 
            key={degree.degreeName} 
            title={degree.title}
            description={degree.description}
            concentrations={degree.concentrations || degree.availableCertificates}
          />
        ))}
      </div>
    </section>
  );
};

export default DegreesTabs;