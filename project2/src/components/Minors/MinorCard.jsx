import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import getData from '../../util/GetData';

const MinorCard = ({ name, title, description }) => {
    //state
    const [expanded, setExpanded] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    //toggle expansion
    const handleToggle = async () => {
        if (!expanded && courses.length === 0) {
            setLoading(true);
            try {
                const data = await getData(`minors/UgMinors/name=${name}`);
                setCourses(data.courses || []);
            } catch (error) {
                console.error('Error loading courses:', error);
            } finally {
                setLoading(false);
            }
        }
        setExpanded(!expanded);
    };

    return (
        <div className={`minor-card ${expanded ? 'expanded' : ''}`}>
            <div className="minor-header" onClick={handleToggle}>
                <h3>{title}</h3>
                <span className="toggle-icon">
                    {loading ? '...' : expanded ? <FaChevronUp /> : <FaChevronDown />}
                </span>
            </div>
            
            {expanded && (
                <div className="minor-content">
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                    
                    {courses.length > 0 ? (
                        <>
                            <h4>Required Courses:</h4>
                            <ul>
                                {courses.map((course, i) => (
                                    <li key={i}>{course}</li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        !loading && <p>No courses available</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MinorCard;