import React from 'react';
import { TabPanel } from '@mui/lab';
import CaseTable from '../CaseTable/CaseTable';

const CaseTabPanel = ({ value }) => {
    return (
        <TabPanel value={value} sx={{ padding: 0 }}>
            <CaseTable />
        </TabPanel>
    );
};

export default CaseTabPanel;