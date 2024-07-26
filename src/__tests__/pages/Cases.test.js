import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import Cases from '../../pages/Cases';
import { fetchPatients } from '../../redux/actions/patientActions';

// Mocks
jest.mock('../../redux/actions/patientActions', () => ({
    fetchPatients: jest.fn()
}));
jest.mock('../../components/CaseTab/CaseFilter', () => () => <div data-testid="case-filter">Mocked CaseFilter</div>);
jest.mock('../../components/CaseTab/CaseTabPanel', () => ({ value }) => <div data-testid="case-tab-panel">Mocked CaseTabPanel {value}</div>);

// Custom mock store
const createMockStore = (initialState) => {
    return {
        getState: jest.fn(() => initialState),
        dispatch: jest.fn(),
        subscribe: jest.fn(),
    };
};

describe('Cases Component', () => {
    let store;

    beforeEach(() => {
        store = createMockStore({
            patients: {
                list: [],
                loading: false,
                error: null
            }
        });
        fetchPatients.mockClear();
    });

    const renderWithProvider = (ui, store) => {
        return render(
            <Provider store={store}>
                {ui}
            </Provider>
        );
    };

    test('renders loading state', () => {
        store = createMockStore({
            patients: {
                list: [],
                loading: true,
                error: null
            }
        });
        renderWithProvider(<Cases />, store);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders error state', () => {
        store = createMockStore({
            patients: {
                list: [],
                loading: false,
                error: 'Test error'
            }
        });
        renderWithProvider(<Cases />, store);
        expect(screen.getByText('Error: Test error')).toBeInTheDocument();
    });

    test('renders Cases component with correct patient count', () => {
        store = createMockStore({
            patients: {
                list: [{ id: 1 }, { id: 2 }],
                loading: false,
                error: null
            }
        });
        renderWithProvider(<Cases />, store);
        expect(screen.getByText('Pending (2)')).toBeInTheDocument();
    });

    test('dispatches fetchPatients action on mount', () => {
        renderWithProvider(<Cases />, store);
        expect(fetchPatients).toHaveBeenCalledTimes(1);
    });

    test('renders CaseFilter and CaseTabPanel', () => {
        renderWithProvider(<Cases />, store);
        expect(screen.getByTestId('case-filter')).toBeInTheDocument();
        expect(screen.getByTestId('case-tab-panel')).toBeInTheDocument();
    });

    test('tab change updates the tab value', async () => {
        renderWithProvider(<Cases />, store);
        const tab = screen.getByRole('tab');
        await userEvent.click(tab);
        expect(tab).toHaveAttribute('aria-selected', 'true');
    });
});