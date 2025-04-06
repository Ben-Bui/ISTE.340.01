import { useState, useEffect } from 'react';
import './Degrees.css';
import getData from '../util/GetData';

const Degrees = () => {
    const [degrees, setDegrees] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [activeDegreeType, setActiveDegreeType] = useState('undergraduate');

    useEffect(() => {
        getData('degrees/')
            .then((data) => {
                setDegrees(data);
                setLoaded(true);
            });
    }, []);

    if (!loaded) return <h1>Loading Degrees...</h1>;

    return (
        <div className="degrees-container">
            <div className="degree-type-tabs">
                <button 
                    className={activeDegreeType === 'undergraduate' ? 'active' : ''}
                    onClick={() => setActiveDegreeType('undergraduate')}
                >
                    Undergraduate
                </button>
                <button 
                    className={activeDegreeType === 'graduate' ? 'active' : ''}
                    onClick={() => setActiveDegreeType('graduate')}
                >
                    Graduate
                </button>
            </div>

            <div className="degree-list">
                {degrees[activeDegreeType].map((degree) => (
                    <div key={degree.degreeName} className="degree-card">
                        <h3>{degree.title}</h3>
                        <div dangerouslySetInnerHTML={{ __html: degree.description }} />
                        {degree.concentrations && (
                            <div>
                                <h4>Concentrations:</h4>
                                <ul>
                                    {degree.concentrations.map((conc, i) => (
                                        <li key={i}>{conc}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Degrees;