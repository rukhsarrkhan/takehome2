import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Table, TableHead, TableBody, Paper, TableContainer } from '@mui/material';
import { useSortedPatients, useGroupedPatients } from '../../utils/patientUtils';
import { renderTableContent } from '../../utils/tableUtils';
import { tableContainerStyles } from '../../styles/caseTableStyles';
import TableHeaderRow from './TableHeaderRow';

const CaseTable = () => {
    const patients = useSelector(state => state.patients.list);
    const filterType = useSelector(state => state.patients.filterType);

    const sortedPatients = useSortedPatients(patients);
    const groupedPatients = useGroupedPatients(sortedPatients);

    const tableContent = useMemo(() =>
        renderTableContent(filterType, groupedPatients, sortedPatients),
        [filterType, groupedPatients, sortedPatients]
    );

    return (
        <TableContainer component={Paper} elevation={0} sx={tableContainerStyles}>
            <Table sx={{ minWidth: 700 }} aria-label="patient table">
                <TableHead>
                    <TableHeaderRow />
                </TableHead>
                <TableBody>
                    {tableContent}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default React.memo(CaseTable);