import React from 'react';
import { Modal, Paper, Button, Typography, Grid, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { generateSummary } from '../../utils/patientUtils';
import { styles } from '../../styles/caseSummaryModalStyles';
import patientPlaceholder from '../../assets/images/placeholders/profile-picture.jpg';
import medicalScan1Placeholder from '../../assets/images/placeholders/placeholder.svg';

const CaseSummaryModal = ({ isOpen, onClose, patient }) => {
    const summary = generateSummary(patient);
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="case-summary-modal"
            aria-describedby="case-summary-description"
        >
            <Paper sx={styles.modalPaper}>
                <Button onClick={onClose} sx={styles.closeButton}>
                    <CloseIcon />
                </Button>
                <Typography variant="h5" component="h2" gutterBottom>
                    Case Summary
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <img src={patientPlaceholder} alt="Patient" style={styles.patientImage} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        {summary.map((item, index) => (
                            <Typography key={index} variant="body1" paragraph>
                                <strong>{item.label}:</strong> {item.value}
                            </Typography>
                        ))}
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Typography variant="h6" gutterBottom>
                        Medical Images
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <img src={medicalScan1Placeholder} alt="Medical scan 1" style={styles.medicalImage} />
                        </Grid>
                        <Grid item xs={6}>
                            <img src={medicalScan1Placeholder} alt="Medical scan 2" style={styles.medicalImage} />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Modal>
    );
};

export default CaseSummaryModal;