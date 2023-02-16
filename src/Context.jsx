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
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  function toggleSignOpen(payload) {
    // *不允許強制轉型！
    if (payload === true || payload === false) {
      SetIsSignOpen(payload);
    } else {
      SetIsSignOpen((prevIsSignOpen) => !prevIsSignOpen);
    }
  }
  function toggleNavbarOpen(payload) {
    if (payload === true || payload === false) {
      setIsNavbarOpen(payload);
    } else {
      setIsNavbarOpen((prevIsNavbarOpen) => !prevIsNavbarOpen);
    }
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
        isNavbarOpen,
        toggleSignOpen,
        signUp,
        signIn,
        handleSignOut,
        toggleNavbarOpen,
      }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
