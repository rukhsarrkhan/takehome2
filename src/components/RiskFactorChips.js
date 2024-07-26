import React from 'react';
import { Box, Chip } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { getChipColor } from '../utils/chipUtils';

const RiskFactorChips = ({ riskFactors }) => (
    <Box>
        {riskFactors.map((risk, index) => (
            <Chip
                key={index}
                icon={<WarningIcon color="black" />}
                label={risk}
                sx={{ backgroundColor: getChipColor(risk), margin: '4px' }}
            />
        ))}
    </Box>
);

export default RiskFactorChips;