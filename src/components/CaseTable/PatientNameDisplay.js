import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { stringAvatar } from '../../utils/avatarUtils';
import { styles } from '../../styles/patientNameDisplayStyles';

const PatientNameDisplay = ({ patient }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', pl: 10 }}>
        <Avatar {...stringAvatar(`${patient.firstName} ${patient.lastName}`)} />
        <Typography sx={styles.patientName}>
            {`${patient.firstName} ${patient.lastName}`}
        </Typography>
    </Box>
);

export default PatientNameDisplay;