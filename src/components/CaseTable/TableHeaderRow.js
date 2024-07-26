import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import { tableHeaderStyles } from '../../styles/caseTableStyles';

const TableHeaderRow = (() => (
    <TableRow>
        {['Patient Name', 'Patient Status', 'Time', 'Risk Factors', 'Action'].map((header) => (
            <TableCell key={header} sx={tableHeaderStyles}>
                {header}
            </TableCell>
        ))}
    </TableRow>
));

export default React.memo(TableHeaderRow);