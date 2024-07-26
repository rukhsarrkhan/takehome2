import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CaseTableRow from '../../../components/CaseTable/CaseTableRow';
import { identifyRiskFactors } from '../../../utils/patientUtils';

// Mock the child components and utilities
jest.mock('../../../components/CaseTable/PatientNameDisplay', () => ({ patient }) => <div data-testid="patient-name">{patient.name}</div>);
jest.mock('../../../components/CaseTable/RiskFactorChips', () => ({ riskFactors }) => <div data-testid="risk-factors">{riskFactors.join(', ')}</div>);
jest.mock('../../../components/CaseSummary/CaseSummaryModal', () => ({ isOpen, onClose, patient }) => (
    isOpen ? <div data-testid="case-summary-modal" onClick={onClose}>{patient.name}</div> : null
));
jest.mock('../../../utils/patientUtils', () => ({
    identifyRiskFactors: jest.fn()
}));

describe('CaseTableRow', () => {
    const mockPatient = {
        id: 1,
        name: 'John Doe',
        status: 'Pending',
        timeElapsed: 24,
    };

    beforeEach(() => {
        identifyRiskFactors.mockReturnValue(['High BP', 'Diabetes']);
    });

    test('renders patient information correctly', () => {
        render(<table><tbody><CaseTableRow patient={mockPatient} /></tbody></table>);

        expect(screen.getByTestId('patient-name')).toHaveTextContent('John Doe');
        expect(screen.getByText('Pending')).toBeInTheDocument();
        expect(screen.getByText('24 hours left')).toBeInTheDocument();
        expect(screen.getByTestId('risk-factors')).toHaveTextContent('High BP, Diabetes');
        expect(screen.getByText('Review Case')).toBeInTheDocument();
    });

    test('opens modal when Review Case button is clicked', () => {
        render(<table><tbody><CaseTableRow patient={mockPatient} /></tbody></table>);

        fireEvent.click(screen.getByText('Review Case'));
        expect(screen.getByTestId('case-summary-modal')).toBeInTheDocument();
    });

    test('closes modal when onClose is called', () => {
        render(<table><tbody><CaseTableRow patient={mockPatient} /></tbody></table>);

        fireEvent.click(screen.getByText('Review Case'));
        fireEvent.click(screen.getByTestId('case-summary-modal'));
        expect(screen.queryByTestId('case-summary-modal')).not.toBeInTheDocument();
    });

    test('renders divider when showDivider prop is true', () => {
        render(<table><tbody><CaseTableRow patient={mockPatient} showDivider={true} /></tbody></table>);

        expect(screen.getByRole('row', { name: '' })).toBeInTheDocument(); // Empty row for divider
    });

    test('does not render divider when showDivider prop is false', () => {
        render(<table><tbody><CaseTableRow patient={mockPatient} showDivider={false} /></tbody></table>);

        expect(screen.queryByRole('row', { name: '' })).not.toBeInTheDocument();
    });

    test('calls identifyRiskFactors with correct patient data', () => {
        render(<table><tbody><CaseTableRow patient={mockPatient} /></tbody></table>);

        expect(identifyRiskFactors).toHaveBeenCalledWith(mockPatient);
    });

    test('renders correct time left', () => {
        const patientWithDifferentTime = { ...mockPatient, timeElapsed: 36 };
        render(<table><tbody><CaseTableRow patient={patientWithDifferentTime} /></tbody></table>);

        expect(screen.getByText('12 hours left')).toBeInTheDocument();
    });
});