import { FETCH_PATIENTS_REQUEST, FETCH_PATIENTS_SUCCESS, FETCH_PATIENTS_FAILURE } from '../actions/patientActions';

const initialState = {
    loading: false,
    list: [],
    error: ''
};

const patientReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PATIENTS_REQUEST:
            return { ...state, loading: true };
        case FETCH_PATIENTS_SUCCESS:
            return { loading: false, list: action.payload, error: '' };
        case FETCH_PATIENTS_FAILURE:
            return { loading: false, list: [], error: action.payload };
        default:
            return state;
    }
};

export default patientReducer;