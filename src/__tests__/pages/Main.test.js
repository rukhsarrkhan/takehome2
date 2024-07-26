import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from '../../pages/Main';

// Mock the components used in Main
jest.mock('../../components/CustomAppBar', () => () => <div data-testid="custom-app-bar">Mocked AppBar</div>);
jest.mock('../../pages/Cases', () => () => <div data-testid="cases">Mocked Cases</div>);

// Mock the entire redux store
jest.mock('react-redux', () => ({
    Provider: ({ children }) => children,
    useSelector: jest.fn(),
    useDispatch: () => jest.fn()
}));

describe('Main Component', () => {
    test('renders CustomAppBar and Cases components', () => {
        render(<Main />);

        const appBar = screen.getByTestId('custom-app-bar');
        const cases = screen.getByTestId('cases');

        expect(appBar).toBeInTheDocument();
        expect(cases).toBeInTheDocument();
    });
});