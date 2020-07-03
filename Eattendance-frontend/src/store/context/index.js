import React from 'react';
import { config } from '../../config';
import AuthContextProvider from './auth';

function RootContext(props) {
    const apiUrl = config.apiUrl;
    return (
        <AuthContextProvider apiUrl={apiUrl}>
            {props.children}
        </AuthContextProvider>
    );
}
export default RootContext;