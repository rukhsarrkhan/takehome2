export const getChipColor = (risk) => {
    switch (risk) {
        case 'Allergies': return 'warning.light';
        case 'High-risk': return 'warning.main';
        case 'Age risk': return 'warning.dark';
        default: return 'default';
    }
};