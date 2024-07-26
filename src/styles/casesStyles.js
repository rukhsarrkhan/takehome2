// src/styles/casesStyles.js

import { styled } from '@mui/material/styles';
import { Box, Container, Tab } from '@mui/material';
import TabList from '@mui/lab/TabList';

export const StyledContainer = styled(Container)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
    },
    [theme.breakpoints.up('xl')]: {
        maxWidth: '2000px',
    },
}));

export const StyledBox = styled(Box)(({ theme }) => ({
    width: '100%',
    typography: 'body1',
    [theme.breakpoints.up('lg')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

export const StyledTabBox = styled(Box)(({ theme }) => ({
    borderBottom: 1,
    borderColor: 'divider',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderWidth: '2px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(0, 2),
    },
    [theme.breakpoints.up('lg')]: {
        maxWidth: '1500px',
    },
}));

export const StyledTabList = styled(TabList)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        flex: 1,
    },
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
    color: '#4caf50',
    '&.Mui-selected': {
        color: '#4caf50',
        fontWeight: 'bold',
    },
    fontSize: '1rem',
    textTransform: 'none',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '1rem',
    },
}));

export const StyledFilterWrapper = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(1),
    },
    [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(2),
    },
}));

export const tabIndicatorProps = {
    style: {
        backgroundColor: 'black',
        height: 2,
    },
};

export const dividerStyles = (theme) => ({
    mt: 1,
    borderColor: '#D9D9D9',
    width: '100%',
    [theme.breakpoints.up('lg')]: {
        maxWidth: '1200px',
    },
});