import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Cases from '../../pages/Cases';
import { fetchPatients } from '../../redux/actions/patientActions';

// Mock the fetchPatients action
jest.mock('../../redux/actions/patientActions', () => ({
    fetchPatients: jest.fn(() => ({ type: 'FETCH_PATIENTS' }))
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Cases Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            patients: {
                list: [],
                loading: false,
                error: null,
            },
        });
        store.dispatch = jest.fn();
    });

    test('renders loading state', () => {
        store = mockStore({
            patients: {
                list: [],
                loading: true,
                error: null,
            },
        });

        render(
            <Provider store={store}>
                <Cases />
            </Provider>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders error state', () => {
        store = mockStore({
            patients: {
                list: [],
                loading: false,
                error: 'Error fetching patients',
            },
        });

        render(
            <Provider store={store}>
                <Cases />
            </Provider>
        );

        expect(screen.getByText('Error: Error fetching patients')).toBeInTheDocument();
    });

    test('renders cases with correct patient count', async () => {
        const patients = [
            { id: '1', firstName: 'John', lastName: 'Doe' },
            { id: '2', firstName: 'Jane', lastName: 'Doe' },
        ];

        store = mockStore({
            patients: {
                list: patients,
                loading: false,
                error: null,
            },
        });

        render(
            <Provider store={store}>
                <Cases />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText(`Pending (${patients.length})`)).toBeInTheDocument();
        });
    });

    test('dispatches fetchPatients action on mount', () => {
        render(
            <Provider store={store}>
                <Cases />
            </Provider>
        );

        expect(store.dispatch).toHaveBeenCalledWith(fetchPatients());
    });

    test('renders cases with empty patient list', async () => {
        render(
            <Provider store={store}>
                <Cases />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Pending (0)')).toBeInTheDocument();
        });
    });

    test('handles large number of patients', async () => {
        const largePatientList = Array(1000).fill().map((_, index) => ({
            id: `${index + 1}`,
            firstName: `Patient${index + 1}`,
            lastName: 'Doe',
        }));

        store = mockStore({
            patients: {
                list: largePatientList,
                loading: false,
                error: null,
            },
        });

        render(
            <Provider store={store}>
                <Cases />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Pending (1000)')).toBeInTheDocument();
        });
    });
});