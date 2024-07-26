import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Main from './Main';

// Mock the components used in Main
jest.mock('../../components/CustomAppBar.js', () => () => <div data-testid="custom-app-bar">Mocked AppBar</div>);
jest.mock('../../pages/Cases.js', () => () => <div data-testid="cases">Mocked Cases</div>);

const mockStore = configureStore([thunk]);

describe('Main Component', () => {
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

    test('renders CustomAppBar and Cases components', () => {
        render(
            <Provider store={store}>
                <Main />
            </Provider>
        );

        expect(screen.getByTestId('custom-app-bar')).toBeInTheDocument();
        expect(screen.getByTestId('cases')).toBeInTheDocument();
    });
});