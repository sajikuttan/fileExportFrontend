import React, { useState, useEffect } from 'react';
import { Table, Input, Pagination, Dropdown } from 'semantic-ui-react';
import { getObservables } from '../api/Api';

const pageSizeOptions = [
    { key: 10, value: 10, text: '10 rows' },
    { key: 50, value: 50, text: '50 rows' },
    { key: 100, value: 100, text: '100 rows' },
];

const DataTable = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [totalCount, setTotalCount] = useState(0);
    const [isFiltered, setFiltered] = useState(false);
    const [filters, setFilters] = useState({
        issue: '',
        service_port: '',
        reported_date: '',
        observation: '',
        severity: '',
        ip_address: '',
        impact: '',
        recommendation: '',
        remidation_team: ''
    });
    useEffect(() => {
        const params = {
            page: activePage,
            pageSize,
        };
        getObservables(params).then((data) => {
            setData(data.observations);
            setFilteredData(data.observations);
            setTotalCount(data.total);
        });
    }, [activePage, pageSize]);

    useEffect(() => {
        if (isFiltered) {
            applyFilters();
        } else {
            setFilteredData(data);
        }
    }, [filters, data, isFiltered]);


    const handlePaginationChange = (e, { activePage }) => {
        setActivePage(activePage)
    };

    const handlePageSizeChange = (e, { value }) => {
        setPageSize(value);
        setActivePage(1);
        setFiltered(false);
    };

    const applyFilters = () => {
        const filtered = data.filter(item => {
            return (
                (filters.issue_name === '' || item.issue_name.toString().includes(filters.issue_name)) &&
                (filters.service_port === '' || item.service_port.toLowerCase().includes(filters.service_port.toLowerCase())) &&
                (filters.reported_date === '' || item.reported_date.toLowerCase().includes(filters.reported_date.toLowerCase())) &&
                (filters.observation === '' || item.observation.toLowerCase().includes(filters.observation.toLowerCase())) &&
                (filters.severity === '' || item.severity === filters.severity) &&
                (filters.ip_address === '' || item.ip_address.toLowerCase().includes(filters.ip_address.toLowerCase())) &&
                (filters.impact === '' || item.impact.toLowerCase().includes(filters.impact.toLowerCase())) &&
                (filters.recommendation === '' || item.recommendation.toLowerCase().includes(filters.recommendation.toLowerCase())) &&
                (filters.remidation_team === '' || item.remidation_team.toLowerCase().includes(filters.remidation_team.toLowerCase()))
            );
        });
        setFilteredData(filtered);
    };
    const handleFilterChange = (e, { name, value }) => {
        setFiltered(true);
        setFilters({ ...filters, [name]: value });
    };
    const convertToDateString = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    const paginatedData = filteredData;
    const severityOptions = [
        {
            key: 0,
            value: 'Critical',
            text: 'Critical',
        },
        {
            key: 1,
            value: 'High',
            text: 'High',
        },
        {
            key: 2,
            value: 'Information',
            text: 'Information',
        },
        {
            key: 3,
            value: 'Low',
            text: 'Low',
        },
        {
            key: 4,
            value: 'Medium',
            text: 'Medium',
        }];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Dropdown
                    selection
                    options={pageSizeOptions}
                    value={pageSize}
                    onChange={handlePageSizeChange}
                />
                <Pagination
                    activePage={activePage}
                    totalPages={totalCount}
                    onPageChange={handlePaginationChange}
                />
            </div>
            <div style={{ overflow: 'scroll' }}>
                <Table celled>
                    <Table.Header>
                        <Table.Row key={'header'}>
                            <Table.HeaderCell>
                                Issue Name
                                <Input
                                    name='issue_name'
                                    value={filters.issue_name || ''}
                                    onChange={handleFilterChange}
                                    placeholder='Issue name'
                                    style={{ width: '100%' }}
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell width={10}>
                                Service Port
                                <Input
                                    name='service_port'
                                    value={filters.service_port || ''}
                                    onChange={handleFilterChange}
                                    placeholder='Service port'
                                    style={{ width: '100%' }}
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Report Date
                                <Input
                                    name='reported_date'
                                    value={filters.reported_date || ''}
                                    onChange={handleFilterChange}
                                    placeholder='Reported Date'
                                    style={{ width: '100%' }}
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Observation
                                <Input
                                    name='observation'
                                    value={filters.observation || ''}
                                    onChange={handleFilterChange}
                                    placeholder='Observation'
                                    style={{ width: '100%' }}
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Severity
                                <Dropdown
                                    placeholder="Severity"
                                    fluid
                                    selection
                                    options={severityOptions || ''}
                                    name="severity"
                                    value={filters.severity}
                                    onChange={handleFilterChange}
                                    clearable
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Ip Address
                                <Input
                                    name='ip_address'
                                    value={filters.ip_address}
                                    onChange={handleFilterChange}
                                    placeholder='Ip Address'
                                    style={{ width: '100%' }}
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Impact
                                <Input
                                    name='impact'
                                    value={filters.impact || ''}
                                    onChange={handleFilterChange}
                                    placeholder='Reported Date'
                                    style={{ width: '100%' }}
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Recommendation
                                <Input
                                    name='recommendation'
                                    value={filters.recommendation || ''}
                                    onChange={handleFilterChange}
                                    placeholder='Recommendation'
                                    style={{ width: '100%' }}
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Remediation
                                <Input
                                    name='remidation_team'
                                    value={filters.remidation_team || ''}
                                    onChange={handleFilterChange}
                                    placeholder='Remediation'
                                    style={{ width: '100%' }}
                                />
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {paginatedData.map(item => (
                            <Table.Row key={item._id}>
                                <Table.Cell>{item.issue_name}</Table.Cell>
                                <Table.Cell>{item.service_port}</Table.Cell>
                                <Table.Cell>{convertToDateString(item.reported_date)}</Table.Cell>
                                <Table.Cell>{item.observation}</Table.Cell>
                                <Table.Cell>{item.severity}</Table.Cell>
                                <Table.Cell>{item.ip_address}</Table.Cell>
                                <Table.Cell>{item.impact}</Table.Cell>
                                <Table.Cell>{item.recommendation}</Table.Cell>
                                <Table.Cell>{item.remidation_team}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default DataTable;
