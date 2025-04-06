import { useEffect, useState } from 'react';
import getData from '../../util/GetData';

const EmploymentStats = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData('employment/');
        setData(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading employment data...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  // For pagination
  const totalRows = data.coopTable?.coopInformation?.length || 0;
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalRows);

  return (
    <div className="employment-container">
      {/* Introduction Section */}
      <section className="introduction-section">
        <h1>{data.introduction?.title || 'Employment Statistics'}</h1>
        
        {data.introduction?.content?.map((section, index) => (
          <div key={index} className="content-block">
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </div>
        ))}
      </section>

      {/* Statistics Section */}
      {data.degreeStatistics && (
        <section className="stats-section">
          <h2>Degree Statistics</h2>
          <div className="stats-grid">
            {data.degreeStatistics.statistics?.map((stat, index) => (
              <div key={index} className="stat-card">
                <h3>{stat.value}</h3>
                <p>{stat.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Employers List */}
      {data.employers && (
        <section className="employers-section">
          <h2>{data.employers.title || 'Employers'}</h2>
          <ul className="employers-list">
            {data.employers.employerNames?.map((employer, index) => (
              <li key={index}>{employer}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Careers List */}
      {data.careers && (
        <section className="careers-section">
          <h2>{data.careers.title || 'Careers'}</h2>
          <ul className="careers-list">
            {data.careers.careerNames?.map((career, index) => (
              <li key={index}>{career}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Co-op Table */}
      {data.coopTable && (
        <section className="coop-table-section">
          <h2>{data.coopTable.title || 'Co-op Employers'}</h2>
          <div className="scrollable-table-container">
            <table>
              <thead>
                <tr>
                  <th>Employer</th>
                  <th>Degree</th>
                  <th>City</th>
                  <th>Term</th>
                </tr>
              </thead>
              <tbody>
                {data.coopTable.coopInformation?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.employer}</td>
                    <td>{item.degree}</td>
                    <td>{item.city}</td>
                    <td>{item.term}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="table-footer">
              <span>Rows per page: {rowsPerPage}</span>
              <span>{startRow}–{endRow} of {totalRows}</span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default EmploymentStats;