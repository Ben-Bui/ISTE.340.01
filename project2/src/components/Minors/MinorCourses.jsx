import { useState, useEffect } from 'react';
import getData from '../../util/GetData';
import MinorCard from './MinorCard';

const MinorCourses = () => {
    //state
    const [minors, setMinors] = useState([]);
    const [loaded, setLoaded] = useState(false);

    //get minors data
    useEffect(() => {
        getData('minors/')
            .then((data) => {
                console.log('got minors', data);
                setMinors(data.UgMinors || []);
                setLoaded(true);
            });
    }, []);

    if (!loaded) return <div>Loading Minors...</div>;

    return (
        <section className="minors-section">
            <h2>Undergraduate Minors</h2>
            <div className="minors-list">
                {minors.map(minor => (
                    <MinorCard 
                        key={minor.name}
                        name={minor.name}
                        title={minor.title}
                        description={minor.description}
                    />
                ))}
            </div>
        </section>
    );
};

export default MinorCourses;