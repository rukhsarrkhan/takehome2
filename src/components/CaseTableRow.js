import React, { useState } from 'react';
import { TableRow, TableCell, Button, Divider } from '@mui/material';
import PatientNameDisplay from './PatientNameDisplay';
import RiskFactorChips from './RiskFactorChips';
import CaseSummaryModal from './CaseSummaryModal';
import { identifyRiskFactors } from '../utils/patientUtils';
import { styles } from '../styles/caseTableRowStyles';

const CaseTableRow = ({ patient, showDivider }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const riskFactors = identifyRiskFactors(patient);

    return (
        <React.Fragment>
            {showDivider && <DividerRow variant="fullWidth" />}
            <TableRow>
                <TableCell>
                    <PatientNameDisplay patient={patient} />
                </TableCell>
                <TableCell sx={styles.statusCell}>{patient.status}</TableCell>
                <TableCell sx={styles.timeCell}>{`${48 - patient.timeElapsed} hours left`}</TableCell>
                <TableCell sx={styles.riskCell}>
                    {riskFactors.length > 0 && <RiskFactorChips riskFactors={riskFactors} />}
                </TableCell>
                <TableCell sx={styles.actionCell}>
                    <Button
                        variant="contained"
                        onClick={handleOpenModal}
                        sx={styles.reviewButton}
                    >
                        Review Case
                    </Button>
                </TableCell>
            </TableRow>
            <CaseSummaryModal isOpen={isModalOpen} onClose={handleCloseModal} patient={patient} />
        </React.Fragment>
    );
};

const DividerRow = () => (
    <TableRow>
        <TableCell colSpan={4} sx={{ py: 0 }}>
            <Divider variant="fullWidth" sx={{ mt: 1 }} />
        </TableCell>
    </TableRow>
);

export default CaseTableRow;