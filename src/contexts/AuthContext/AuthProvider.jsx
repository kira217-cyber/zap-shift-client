import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

import { auth } from "../../firebase/firebase.init";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(true)
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email,password) =>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password ) 
  }
   const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const updateUserProfile = (profileInfo)=>{
      return updateProfile(auth.currentUser,profileInfo)
    }

  const logOut = () =>{
    setLoading(true)
    return signOut(auth)
  }

  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth, currentUser=>{
      setUser(currentUser)
      console.log('user in the on state change', currentUser)
      setLoading(false)
    });

    return () => {
      unSubscribe()
    }
  },[])

  const authInfo = {
    createUser,
    signIn,
    setUser,
    user,
    loading,
    signInWithGoogle,
    updateUserProfile,
    logOut
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
