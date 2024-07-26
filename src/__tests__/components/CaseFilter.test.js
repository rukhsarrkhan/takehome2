import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CaseFilter from '../../components/CaseTab';

describe('CaseFilter Component', () => {
    const mockHandleFilterTypeChange = jest.fn();

    test('renders with default filter', () => {
        render(<CaseFilter filterType="default" handleFilterTypeChange={mockHandleFilterTypeChange} />);
        expect(screen.getByText('No filter')).toBeInTheDocument();
    });

    test('renders with diagnosis filter', () => {
        render(<CaseFilter filterType="diagnosis" handleFilterTypeChange={mockHandleFilterTypeChange} />);
        expect(screen.getByText('By diagnosis')).toBeInTheDocument();
    });

    test('calls handleFilterTypeChange when filter is changed', () => {
        render(<CaseFilter filterType="default" handleFilterTypeChange={mockHandleFilterTypeChange} />);

        // fireEvent.mouseDown(screen.getByRole('button'));
        fireEvent.click(screen.getByText('By diagnosis'));

        expect(mockHandleFilterTypeChange).toHaveBeenCalledTimes(1);
    });
});