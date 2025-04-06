import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import getData from '../../util/GetData';

const MinorCard = ({ name, title, description }) => {
  const [expanded, setExpanded] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    if (!expanded) {
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
          {loading ? (
            <span className="loading-spinner"></span>
          ) : expanded ? (
            <FaChevronUp />
          ) : (
            <FaChevronDown />
          )}
        </span>
      </div>
      
      <div className="minor-content">
        {expanded && (
          <>
            <div 
              className="minor-description" 
              dangerouslySetInnerHTML={{ __html: description }} 
            />
            
            {courses.length > 0 ? (
              <>
                <h4>Required Courses:</h4>
                <ul className="courses-list">
                  {courses.map((course, i) => (
                    <li key={i}>{course}</li>
                  ))}
                </ul>
              </>
            ) : (
              !loading && <p>No courses available</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MinorCard;