import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CaseTable from '../../../components/CaseTable/CaseTable';
import { useSortedPatients, useGroupedPatients } from '../../../utils/patientUtils';
import { renderTableContent } from '../../../utils/tableUtils';

// Mock the custom hooks and utilities
jest.mock('../../../utils/patientUtils', () => ({
    useSortedPatients: jest.fn(),
    useGroupedPatients: jest.fn(),
}));

jest.mock('../../../utils/tableUtils', () => ({
    renderTableContent: jest.fn(),
}));

// Mock the TableHeaderRow component
jest.mock('../../../components/CaseTable/TableHeaderRow', () => () => <tr data-testid="table-header-row" />);

const mockStore = configureStore([]);

describe('CaseTable', () => {
    let store;
    const mockPatients = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
    ];

    beforeEach(() => {
        store = mockStore({
            patients: {
                list: mockPatients,
                filterType: 'all',
            },
        });

        useSortedPatients.mockReturnValue(mockPatients);
        useGroupedPatients.mockReturnValue({ all: mockPatients });
        renderTableContent.mockReturnValue(<tr><td>Mocked Table Content</td></tr>);
    });

    test('renders CaseTable component', () => {
        render(
            <Provider store={store}>
                <CaseTable />
            </Provider>
        );

        expect(screen.getByLabelText('patient table')).toBeInTheDocument();
        expect(screen.getByTestId('table-header-row')).toBeInTheDocument();
        expect(screen.getByText('Mocked Table Content')).toBeInTheDocument();
    });

    test('calls useSortedPatients with correct patients', () => {
        render(
            <Provider store={store}>
                <CaseTable />
            </Provider>
        );

        expect(useSortedPatients).toHaveBeenCalledWith(mockPatients);
    });

    test('calls useGroupedPatients with sorted patients', () => {
        render(
            <Provider store={store}>
                <CaseTable />
            </Provider>
        );

        expect(useGroupedPatients).toHaveBeenCalledWith(mockPatients);
    });

    test('calls renderTableContent with correct arguments', () => {
        render(
            <Provider store={store}>
                <CaseTable />
            </Provider>
        );

        expect(renderTableContent).toHaveBeenCalledWith('all', { all: mockPatients }, mockPatients);
    });

    test('re-renders when filterType changes', () => {
        const { rerender } = render(
            <Provider store={store}>
                <CaseTable />
            </Provider>
        );

        expect(renderTableContent).toHaveBeenCalledWith('all', { all: mockPatients }, mockPatients);

        store = mockStore({
            patients: {
                list: mockPatients,
                filterType: 'urgent',
            },
        });

        rerender(
            <Provider store={store}>
                <CaseTable />
            </Provider>
        );

        expect(renderTableContent).toHaveBeenCalledWith('urgent', { all: mockPatients }, mockPatients);
    });
});