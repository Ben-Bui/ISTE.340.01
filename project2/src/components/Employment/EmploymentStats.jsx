import { useEffect, useState } from 'react';
import getData from '../../util/GetData';

const EmploymentStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getData('employment/');
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const renderStatValue = (value) => {
    if (value === null || value === undefined) return 'N/A';
    
    switch (typeof value) {
      case 'object':
        return (
          <div className="nested-stats">
            {Object.entries(value).map(([subKey, subValue]) => (
              <div key={subKey} className="nested-stat-item">
                <strong>{subKey}:</strong> {renderStatValue(subValue)}
              </div>
            ))}
          </div>
        );
      case 'boolean':
        return value ? 'Yes' : 'No';
      default:
        return value.toString();
    }
  };

  if (loading) return <div className="loading">Loading employment data...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!stats) return <div>No statistics available</div>;

  return (
    <section className="employment-stats">
      <h2>Employment Statistics</h2>
      
      <div className="scrollable-stats-container">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="stat-card">
            <h3>{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
            <div className="stat-value">
              {renderStatValue(value)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EmploymentStats;