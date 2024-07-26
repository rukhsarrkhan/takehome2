import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CaseSummaryModal from '../../../components/CaseSummary/CaseSummaryModal';
import { generateSummary } from '../../../utils/patientUtils';

// Mock the patientUtils
jest.mock('../../../utils/patientUtils', () => ({
    generateSummary: jest.fn(),
}));

// Mock the image imports
jest.mock('../../../assets/images/placeholders/profile-picture.jpg', () => 'mocked-profile-picture.jpg');
jest.mock('../../../assets/images/placeholders/placeholder.svg', () => 'mocked-placeholder.svg');

describe('CaseSummaryModal', () => {
    const mockPatient = {
        id: 1,
        name: 'John Doe',
        age: 30,
        gender: 'Male',
    };

    const mockSummary = [
        { label: 'Name', value: 'John Doe' },
        { label: 'Age', value: '30' },
        { label: 'Gender', value: 'Male' },
    ];

    beforeEach(() => {
        generateSummary.mockReturnValue(mockSummary);
    });

    test('renders modal when isOpen is true', () => {
        render(<CaseSummaryModal isOpen={true} onClose={() => { }} patient={mockPatient} />);
        expect(screen.getByText('Case Summary')).toBeInTheDocument();
    });

    test('does not render modal when isOpen is false', () => {
        render(<CaseSummaryModal isOpen={false} onClose={() => { }} patient={mockPatient} />);
        expect(screen.queryByText('Case Summary')).not.toBeInTheDocument();
    });

    test('displays patient information correctly', () => {
        render(<CaseSummaryModal isOpen={true} onClose={() => { }} patient={mockPatient} />);
        mockSummary.forEach(item => {
            expect(screen.getByText(item.label + ':')).toBeInTheDocument();
            expect(screen.getByText(item.value)).toBeInTheDocument();
        });
    });

    test('calls onClose when close button is clicked', () => {
        const mockOnClose = jest.fn();
        render(<CaseSummaryModal isOpen={true} onClose={mockOnClose} patient={mockPatient} />);
        const closeButton = screen.getByRole('button');
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('renders patient image', () => {
        render(<CaseSummaryModal isOpen={true} onClose={() => { }} patient={mockPatient} />);
        const patientImage = screen.getByAltText('Patient');
        expect(patientImage).toBeInTheDocument();
        expect(patientImage.src).toContain('mocked-profile-picture.jpg');
    });

    test('renders medical images', () => {
        render(<CaseSummaryModal isOpen={true} onClose={() => { }} patient={mockPatient} />);
        const medicalImages = screen.getAllByAltText(/Medical scan/);
        expect(medicalImages).toHaveLength(2);
        medicalImages.forEach(img => {
            expect(img.src).toContain('mocked-placeholder.svg');
        });
    });

    test('calls generateSummary with correct patient data', () => {
        render(<CaseSummaryModal isOpen={true} onClose={() => { }} patient={mockPatient} />);
        expect(generateSummary).toHaveBeenCalledWith(mockPatient);
    });
});