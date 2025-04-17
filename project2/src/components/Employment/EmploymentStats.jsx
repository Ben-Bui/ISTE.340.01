import { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
import getData from '../../util/GetData';

const EmploymentStats = () => {
    //state vars
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(100); //fixed rows per page

    //get employment data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getData('employment/');
                console.log('got employment data', response); //your debug style
                setData(response);
            } catch (err) {
                console.error('Error fetching employment:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    //table columns config
    const columns = useMemo(() => [
        { Header: 'Employer', accessor: 'employer' },
        { Header: 'Degree', accessor: 'degree' },
        { Header: 'City', accessor: 'city' },
        { Header: 'Term', accessor: 'term' }
    ], []);

    //table data
    const tableData = useMemo(() => data?.coopTable?.coopInformation || [], [data]);

    //react-table setup
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: tableData });

    //calc row counts 
    const totalRows = data?.coopTable?.coopInformation?.length || 0;
    const startRow = (currentPage - 1) * rowsPerPage + 1;
    const endRow = Math.min(currentPage * rowsPerPage, totalRows);

    //loading/error states
    if (loading) return <div className="loading">Loading employment data...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!data) return <div>No data available</div>;

    return (
        <div className="employment-container">
            {/* Intro section */}
            <section className="introduction-section">
                <h1>{data.introduction?.title || 'Employment Statistics'}</h1>
                {data.introduction?.content?.map((section, i) => (
                    <div key={i} className="content-block">
                        <h2>{section.title}</h2>
                        <p>{section.description}</p>
                    </div>
                ))}
            </section>

            {/* Stats section */}
            {data.degreeStatistics && (
                <section className="stats-section">
                    <h2>Degree Statistics</h2>
                    <div className="stats-grid">
                        {data.degreeStatistics.statistics?.map((stat, i) => (
                            <div key={i} className="stat-card">
                                <h3>{stat.value}</h3>
                                <p>{stat.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Employers list */}
            {data.employers && (
                <section className="employers-section">
                    <h2>{data.employers.title || 'Employers'}</h2>
                    <ul className="employers-list">
                        {data.employers.employerNames?.map((employer, i) => (
                            <li key={i}>{employer}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Careers list */}
            {data.careers && (
                <section className="careers-section">
                    <h2>{data.careers.title || 'Careers'}</h2>
                    <ul className="careers-list">
                        {data.careers.careerNames?.map((career, i) => (
                            <li key={i}>{career}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Co-op table */}
            {data.coopTable && (
                <section className="coop-table-section">
                    <h2>{data.coopTable.title || 'Co-op Employers'}</h2>
                    <div className="scrollable-table-container">
                        <table {...getTableProps()}>
                            <thead>
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps()}>
                                                {column.render('Header')}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map(row => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => (
                                                <td {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </td>
                                            ))}
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