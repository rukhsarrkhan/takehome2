// Risk Factor Indicator colors to indicate criticality of a case as well as give max information on the table for each case
export const getChipColor = (risk) => {
    switch (risk) {
        case 'Allergies': return '#90caf9';
        case 'High-risk': return 'warning.main';
        case 'Age risk': return 'error.main';
        default: return 'default';
    }
};