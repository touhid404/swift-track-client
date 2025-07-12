import React, { Children, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from './../../firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
const googleProvider = new GoogleAuthProvider();
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
    // Sign in with Google
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
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
       signInWithGoogle,
       signOutUser,
    }
    return (
        <AuthContext value={authInfo}>
            {children}

        </AuthContext>
    );
};

export default AuthProvider;