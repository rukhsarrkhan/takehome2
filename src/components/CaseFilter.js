import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, Select, MenuItem } from '@mui/material';
import { formControlStyles, selectStyles } from '../styles/caseFilterStyles';

const CaseFilter = ({ filterType, handleFilterTypeChange }) => {
    return (
        <FormControl sx={formControlStyles}>
            <Select
                labelId="filter-type-label"
                value={filterType}
                onChange={handleFilterTypeChange}
                displayEmpty
                sx={selectStyles}
            >
                <MenuItem value="default">No filter</MenuItem>
                <MenuItem value="diagnosis">By diagnosis</MenuItem>
            </Select>
        </FormControl>
    );
};

CaseFilter.propTypes = {
    filterType: PropTypes.oneOf(['default', 'diagnosis']).isRequired,
    handleFilterTypeChange: PropTypes.func.isRequired,
};

export default CaseFilter;