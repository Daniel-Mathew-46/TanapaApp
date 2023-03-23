import React, { createContext, useState } from "react";
import { auth, signInWithEmailAndPassword } from "./firebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const authContext = {
    User: user,
    setUser: setUser,
    SignIn: async (username_email, password) => {
      try {
        await signInWithEmailAndPassword(username_email, password);
      } catch (e) {
        console.log(e);
      }
    },
    SignUp: async (username_email, password) => {
      try {
        await auth.createUserWithEmailAndPassword(username_email, password);
      } catch (e) {
        console.log(e);
      }
    },
    SignUp: async () => {
      try {
        await auth.signOut();
      } catch (e) {
        console.log(e);
      }
    },
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
