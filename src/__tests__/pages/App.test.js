import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ThemeProvider, createTheme } from '@mui/material';
import App from './App';

// Mock CustomRoutes
jest.mock('../CustomRoutes', () => () => <div data-testid="custom-routes">Mocked Routes</div>);

const mockStore = configureStore([thunk]);

describe('App Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            patients: {
                list: [],
                loading: false,
                error: null
            }
        });
    });

    test('renders without crashing', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        // Check if the mocked CustomRoutes component is rendered
        expect(screen.getByTestId('custom-routes')).toBeInTheDocument();
    });

    test('applies theme correctly', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        // You can add more specific theme checks here if needed
        const rootElement = screen.getByTestId('custom-routes').parentElement;
        expect(rootElement).toHaveStyle('font-family: Lato, sans-serif');
    });
});