import React from 'react';
import { render, screen } from '@testing-library/react';
import CaseTabPanel from '../../components/CaseTabPanel';
import { TabContext } from '@mui/lab';

jest.mock('../../components/CaseTable', () => {
    return function MockCaseTable({ filterType }) {
        return <div data-testid="case-table">MockCaseTable: {filterType}</div>;
    };
});

describe('CaseTabPanel Component', () => {
    test('renders CaseTable with correct props', () => {
        render(
            <TabContext value="1">
                <CaseTabPanel value="1" filterType="default" />
            </TabContext>
        );

        const caseTable = screen.getByTestId('case-table');
        expect(caseTable).toHaveTextContent('MockCaseTable: default');
    });

    test('renders CaseTable with diagnosis filter', () => {
        render(
            <TabContext value="1">
                <CaseTabPanel value="1" filterType="diagnosis" />
            </TabContext>
        );

        const caseTable = screen.getByTestId('case-table');
        expect(caseTable).toHaveTextContent('MockCaseTable: diagnosis');
    });
});