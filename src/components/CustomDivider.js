import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Box } from '@mui/material';

export default function CustomDivider({ pt = 0, pb = 0 }) {
  return (
    <Box sx={{ width: '100%', pt, pb }}>
      <Divider variant="fullWidth" sx={{ my: 1, borderColor: '#D9D9D9' }} />
    </Box>
  );
}

CustomDivider.propTypes = {
  pt: PropTypes.number,
  pb: PropTypes.number,
};