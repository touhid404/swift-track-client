import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
    if(loading) {
        return <p>loading</p>
    }

    if(!user) {
        return <Navigate to='/login'></Navigate>
    }
    return children;
};

export default PrivateRoute;