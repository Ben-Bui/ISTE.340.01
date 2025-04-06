import { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
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

  const columns = useMemo(() => [
    { Header: 'Employer', accessor: 'employer' },
    { Header: 'Degree', accessor: 'degree' },
    { Header: 'City', accessor: 'city' },
    { Header: 'Term', accessor: 'term' }
  ], []);

  const tableData = useMemo(() =>
    data?.coopTable?.coopInformation || [],
    [data]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData });

  if (loading) return <div className="loading">Loading employment data...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  const totalRows = data.coopTable?.coopInformation?.length || 0;
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalRows);

  return (
    <div className="employment-container">
      <section className="introduction-section">
        <h1>{data.introduction?.title || 'Employment Statistics'}</h1>
        {data.introduction?.content?.map((section, index) => (
          <div key={index} className="content-block">
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </div>
        ))}
      </section>

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

      {data.coopTable && (
        <section className="coop-table-section">
          <h2>{data.coopTable.title || 'Co-op Employers'}</h2>
          <div className="scrollable-table-container">
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map(headerGroup => {
                  const { key, ...restGroup } = headerGroup.getHeaderGroupProps();
                  return (
                    <tr key={key} {...restGroup}>
                      {headerGroup.headers.map(column => {
                        const { key: colKey, ...colProps } = column.getHeaderProps();
                        return (
                          <th key={colKey} {...colProps}>
                            {column.render('Header')}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                  prepareRow(row);
                  const { key, ...rowProps } = row.getRowProps();
                  return (
                    <tr key={key} {...rowProps}>
                      {row.cells.map(cell => {
                        const { key: cellKey, ...cellProps } = cell.getCellProps();
                        return (
                          <td key={cellKey} {...cellProps}>
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
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