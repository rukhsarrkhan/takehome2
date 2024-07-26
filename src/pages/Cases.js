import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Container,
    Typography,
    Tab,
    Divider
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { fetchPatients } from '../redux/actions/patientActions';
import CaseFilter from '../components/CaseFilter';
import CaseTabPanel from '../components/CaseTabPanel';

const Cases = () => {
    const dispatch = useDispatch();
    const patients = useSelector(state => state.patients.list);
    const loading = useSelector(state => state.patients.loading);
    const error = useSelector(state => state.patients.error);
    const [filterType, setFilterType] = useState('default');
    const [tabValue, setTabValue] = useState("1");

    useEffect(() => {
        dispatch(fetchPatients());
    }, [dispatch]);

    const handleFilterTypeChange = (event) => {
        setFilterType(event.target.value);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

    const tabLabel = `Pending (${patients.length})`;

    return (
        <Container maxWidth="xl">
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderWidth: '2px' }}>
                        <TabList
                            onChange={handleTabChange}
                            aria-label="case tabs"
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: 'black',
                                    height: 2,
                                }
                            }}
                        >
                            <Tab
                                label={tabLabel}
                                value="1"
                                sx={{
                                    color: '#4caf50',
                                    '&.Mui-selected': {
                                        color: '#4caf50',
                                        fontWeight: 'bold',
                                    },
                                    fontSize: '1rem',
                                    textTransform: 'none',
                                }}
                            />
                        </TabList>
                        <CaseFilter filterType={filterType} handleFilterTypeChange={handleFilterTypeChange} />
                    </Box>
                    <Divider variant="fullWidth" sx={{ mt: 1, borderColor: '#D9D9D9' }} />

                    <CaseTabPanel value="1" filterType={filterType} />
                </TabContext>
            </Box>
        </Container>
    );
};

export default Cases;