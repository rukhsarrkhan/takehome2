import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import CaseFilter from '../../../components/CaseTab/CaseFilter';
import { setFilterType } from '../../../redux/actions/patientActions';

// Mock the Redux action
jest.mock('../../../redux/actions/patientActions', () => ({
    setFilterType: jest.fn()
}));

// Create a simple mock store
const createMockStore = (initialState) => {
    return {
        getState: jest.fn(() => initialState),
        dispatch: jest.fn(),
        subscribe: jest.fn()
    };
};

describe('CaseFilter', () => {
    let store;

    beforeEach(() => {
        store = createMockStore({
            patients: {
                filterType: 'default'
            }
        });
    });

    const renderWithRedux = (component) => {
        return render(
            <Provider store={store}>
                {component}
            </Provider>
        );
    };

    test('renders CaseFilter component', () => {
        renderWithRedux(<CaseFilter />);
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByText('No filter')).toBeInTheDocument();
    });

    test('displays correct initial value', () => {
        renderWithRedux(<CaseFilter />);
        expect(screen.getByRole('combobox')).toHaveTextContent('No filter');
    });

    test('changes filter type when a new option is selected', () => {
        renderWithRedux(<CaseFilter />);
        const selectElement = screen.getByRole('combobox');
        fireEvent.mouseDown(selectElement);
        const listbox = within(screen.getByRole('listbox'));
        fireEvent.click(listbox.getByText('By diagnosis'));
        expect(setFilterType).toHaveBeenCalledWith('diagnosis');
        expect(store.dispatch).toHaveBeenCalled();
    });

    test('renders all filter options', () => {
        renderWithRedux(<CaseFilter />);
        const selectElement = screen.getByRole('combobox');
        fireEvent.mouseDown(selectElement);
        const listbox = within(screen.getByRole('listbox'));
        expect(listbox.getByText('No filter')).toBeInTheDocument();
        expect(listbox.getByText('By diagnosis')).toBeInTheDocument();
    });

    test('displays selected filter type from Redux store', () => {
        store = createMockStore({
            patients: {
                filterType: 'diagnosis'
            }
        });
        renderWithRedux(<CaseFilter />);
        expect(screen.getByRole('combobox')).toHaveTextContent('By diagnosis');
    });

    test('handles empty filter type in Redux store', () => {
        store = createMockStore({
            patients: {
                filterType: null
            }
        });
        renderWithRedux(<CaseFilter />);
        expect(screen.getByRole('combobox')).toHaveTextContent('No filter');
    });
});