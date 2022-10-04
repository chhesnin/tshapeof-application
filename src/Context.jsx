import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

const Context = React.createContext();

export function ContextProvider({ children }) {
  const MEMBER_DISCOUNT = 0.9;
  const [isSignOpen, SetIsSignOpen] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  function toggleSignOpen() {
    SetIsSignOpen((prevIsSignOpen) => !prevIsSignOpen);
  }
  function signUp(email, password) {
    SetIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        SetIsLoading(false);
        SetIsSignOpen(false);
      })
      .catch((error) => {
        setAlert(error.message);
        SetIsLoading(false);
        setTimeout(() => {
          setAlert(null);
        }, 2000);
      });
  }
  function signIn(email, password) {
    SetIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        SetIsLoading(false);
        SetIsSignOpen(false);
      })
      .catch((error) => {
        setAlert(error.message);
        SetIsLoading(false);
        setTimeout(() => {
          setAlert(null);
        }, 2000);
      });
  }
  function handleSignOut() {
    signOut(auth).then(() => {
      setUser(null);
    });
  }
  return (
    <Context.Provider
      value={{
        MEMBER_DISCOUNT,
        isSignOpen,
        isLoading,
        user,
        alert,
        toggleSignOpen,
        signUp,
        signIn,
        handleSignOut
      }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
