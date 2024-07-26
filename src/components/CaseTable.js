import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, TableContainer } from '@mui/material';
import { useSortedPatients, useGroupedPatients } from '../utils/patientUtils';
import { renderTableContent } from '../utils/tableUtils';
import { tableContainerStyles, tableHeaderStyles } from '../styles/caseTableStyles';

const CaseTable = ({ filterType }) => {
    const patients = useSelector(state => state.patients.list);

    const sortedPatients = useSortedPatients(patients);
    const groupedPatients = useGroupedPatients(sortedPatients);

    return (
        <TableContainer component={Paper} elevation={0} sx={tableContainerStyles}>
            <Table sx={{ minWidth: 700 }} aria-label="patient table">
                <TableHead>
                    <TableHeaderRow />
                </TableHead>
                <TableBody>
                    {renderTableContent(filterType, groupedPatients, sortedPatients)}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const TableHeaderRow = () => (
    <TableRow>
        {['Patient Name', 'Patient Status', 'Time', 'Risk Factors', 'Action'].map((header) => (
            <TableCell key={header} sx={tableHeaderStyles}>
                {header}
            </TableCell>
        ))}
    </TableRow>
);

export default CaseTable;