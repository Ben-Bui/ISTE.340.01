import { useState, useEffect } from 'react';
import './Minors.css';
import getData from '../util/GetData';

const Minors = () => {
    const [minors, setMinors] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [expandedMinor, setExpandedMinor] = useState(null);
    const [courses, setCourses] = useState({});

    useEffect(() => {
        getData('minors/')
            .then((data) => {
                setMinors(data.UgMinors);
                setLoaded(true);
            });
    }, []);

    const handleMinorClick = async (minorName) => {
        if (expandedMinor === minorName) {
            setExpandedMinor(null);
        } else {
            setExpandedMinor(minorName);
            if (!courses[minorName]) {
                try {
                    const courseData = await getData(`minors/UgMinors/name=${minorName}`);
                    setCourses(prev => ({ ...prev, [minorName]: courseData.courses }));
                } catch (error) {
                    console.error('Error loading courses:', error);
                }
            }
        }
    };

    if (!loaded) return <h1>Loading Minors...</h1>;

    return (
        <div className="minors-container">
            <h2>Undergraduate Minors</h2>
            <div className="minor-list">
                {minors.map((minor) => (
                    <div key={minor.name} className="minor-card">
                        <div 
                            className="minor-header"
                            onClick={() => handleMinorClick(minor.name)}
                        >
                            <h3>{minor.title}</h3>
                            <span>{expandedMinor === minor.name ? '−' : '+'}</span>
                        </div>
                        
                        {expandedMinor === minor.name && (
                            <div className="minor-details">
                                <div dangerouslySetInnerHTML={{ __html: minor.description }} />
                                
                                <h4>Courses:</h4>
                                <ul className="course-list">
                                    {courses[minor.name]?.map((course) => (
                                        <li key={course}>{course}</li>
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

export default Minors;