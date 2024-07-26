import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Divider, useTheme } from '@mui/material';
import TabContext from '@mui/lab/TabContext';

import { fetchPatients } from '../redux/actions/patientActions';
import CaseFilter from '../components/CaseTab/CaseFilter';
import CaseTabPanel from '../components/CaseTab/CaseTabPanel';
import {
    StyledContainer,
    StyledBox,
    StyledTabBox,
    StyledTabList,
    StyledTab,
    StyledFilterWrapper,
    tabIndicatorProps,
    dividerStyles
} from '../styles/casesStyles';

const Cases = () => {
    const dispatch = useDispatch();
    const patients = useSelector(state => state.patients.list);
    const loading = useSelector(state => state.patients.loading);
    const error = useSelector(state => state.patients.error);

    const [tabValue, setTabValue] = useState("1");
    const theme = useTheme();

    useEffect(() => {
        dispatch(fetchPatients());
    }, [dispatch]);

    const handleTabChange = useCallback((event, newValue) => {
        setTabValue(newValue);
    }, []);

    const tabLabel = useMemo(() => `Pending (${patients.length})`, [patients.length]);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;


    return (
        <StyledContainer maxWidth="xl">
            <StyledBox>
                <TabContext value={tabValue}>
                    <StyledTabBox>
                        <StyledTabList
                            onChange={handleTabChange}
                            aria-label="case tabs"
                            TabIndicatorProps={tabIndicatorProps}
                        >
                            <StyledTab
                                label={tabLabel}
                                value="1"
                            />
                        </StyledTabList>
                        <StyledFilterWrapper>
                            <CaseFilter />
                        </StyledFilterWrapper>
                    </StyledTabBox>
                    <Divider variant="fullWidth" sx={dividerStyles(theme)} />
                    <CaseTabPanel value="1" />
                </TabContext>
            </StyledBox>
        </StyledContainer>
    );
};

export default React.memo(Cases);
