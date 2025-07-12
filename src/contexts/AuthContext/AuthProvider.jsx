import React, { Children, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from './../../firebase/firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);




    // create a new user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // Sign in to user
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //Sign out user
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);

        }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,currentUser => {
            setUser(currentUser);
            console.log("Current User:", currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);


    const authInfo = {
       user,
       loading,
       createUser,
       signInUser,
       signOutUser,
    }
    return (
        <AuthContext value={authInfo}>
            {children}

        </AuthContext>
    );
};

export default AuthProvider;