export const stringAvatar = (name) => {
    const initials = name
        ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
        : '';
    return {
        sx: {
            backgroundColor: '#D9D9D9',
            color: '#484848',
            width: 40,
            height: 40,
            fontSize: '16px',
            fontWeight: 'bold'
        },
        children: initials,
    };
};