import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Select, MenuItem } from '@mui/material';
import { formControlStyles, selectStyles } from '../../styles/caseFilterStyles';
import { setFilterType } from '../../redux/actions/patientActions';

const CaseFilter = () => {
    const dispatch = useDispatch();
    const filterType = useSelector(state => {
        return state.patients.filterType;
    });

    const handleFilterTypeChange = (event) => {
        dispatch(setFilterType(event.target.value));
    };

    return (
        <FormControl sx={formControlStyles}>
            <Select
                labelId="filter-type-label"
                value={filterType || 'default'}
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

export default CaseFilter;