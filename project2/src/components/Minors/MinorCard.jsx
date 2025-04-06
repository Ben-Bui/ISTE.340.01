import { useState } from 'react';
import getData from '../../util/GetData';

const MinorCard = ({ name, title, description }) => {
  const [showCourses, setShowCourses] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleToggleCourses = async () => {
    if (!showCourses && courses.length === 0) {
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
    setShowCourses(!showCourses);
  };

  return (
    <div className="minor-card">
      <h3>{title}</h3>
      <div className="minor-description" dangerouslySetInnerHTML={{ __html: description }} />
      <button onClick={handleToggleCourses} disabled={loading}>
        {loading ? 'Loading...' : showCourses ? 'Hide Courses' : 'Show Courses'}
      </button>
      {showCourses && (
        <ul className="courses-list">
          {courses.map((course, i) => (
            <li key={i}>{course}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MinorCard;