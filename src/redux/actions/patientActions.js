import axios from 'axios';

export const FETCH_PATIENTS_REQUEST = 'FETCH_PATIENTS_REQUEST';
export const FETCH_PATIENTS_SUCCESS = 'FETCH_PATIENTS_SUCCESS';
export const FETCH_PATIENTS_FAILURE = 'FETCH_PATIENTS_FAILURE';
export const SET_FILTER_TYPE = 'SET_FILTER_TYPE';

export const fetchPatients = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_PATIENTS_REQUEST });
        axios.get('http://localhost:3001/patients')
            .then(response => {
                dispatch({ type: FETCH_PATIENTS_SUCCESS, payload: response.data });
            })
            .catch(error => {
                dispatch({ type: FETCH_PATIENTS_FAILURE, payload: error.message });
            });
    };
};

export const setFilterType = (filterType) => ({
    type: SET_FILTER_TYPE,
    payload: filterType
});