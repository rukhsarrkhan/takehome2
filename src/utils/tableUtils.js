import React from 'react';
import { TableRow, TableCell, Divider } from '@mui/material';
import CaseTableRow from '../components/CaseTableRow';
import { diagnosisStyles, tableCellStyles, dividerStyles } from '../styles/caseTableStyles';

export const renderTableContent = (filterType, groupedPatients, sortedPatients) => {
    if (filterType === 'diagnosis') {
        return renderGroupedPatients(groupedPatients);
    }
    return sortedPatients.map(patient => <CaseTableRow key={patient.id} patient={patient} />);
};

const renderGroupedPatients = (groupedPatients) => {
    return Object.entries(groupedPatients).flatMap(([diagnosis, patients], index, array) => [
        <DiagnosisRow key={`diagnosis-${diagnosis}`} diagnosis={diagnosis} />,
        ...patients.map(patient => <CaseTableRow key={patient.id} patient={patient} />),
        index < array.length - 1 ? <DividerRow key={`divider-${diagnosis}`} /> : null
    ]);
};

const DiagnosisRow = ({ diagnosis }) => (
    <TableRow>
        <TableCell colSpan={5} sx={diagnosisStyles}>
            {diagnosis}
        </TableCell>
    </TableRow>
);

const DividerRow = () => (
    <TableRow>
        <TableCell colSpan={5} sx={tableCellStyles}>
            <Divider sx={dividerStyles} />
        </TableCell>
    </TableRow>
);