import React from 'react';
import { TabPanel } from '@mui/lab';
import CaseTable from './CaseTable';

const CaseTabPanel = ({ value, filterType }) => {
    return (
        <TabPanel value={value} sx={{ padding: 0 }}>
            <CaseTable filterType={filterType} />
        </TabPanel>
    );
};

export default CaseTabPanel;