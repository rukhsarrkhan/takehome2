import React from 'react';
import { Provider } from 'react-redux';
import CustomAppBar from "../components/CustomAppBar";
import Cases from '../pages/Cases';
import store from '../redux/store';

export default function Main() {
    return (
        <Provider store={store}>
            <CustomAppBar />
            <Cases />
        </Provider>
    );
}
