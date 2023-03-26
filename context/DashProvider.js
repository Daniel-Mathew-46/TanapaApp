import React, { createContext, useState } from "react";

export const DashContext = createContext({});

const DashProvider = ({ children }) => {
  const [katibuData, setKatibuData] = useState("peterkyara@gmail.com");
  const dashContext = React.useMemo(() => ({
    katibuData,
    setKatibuData,
    // getKatibuData: async () => {
    //   try {
    //     await signInWithEmailAndPassword(username_email, password);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    // SignUp: async (username_email, password) => {
    //   try {
    //     await auth.createUserWithEmailAndPassword(username_email, password);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    // SignUp: async () => {
    //   try {
    //     await auth.signOut();
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
  }));

  return (
    <DashContext.Provider value={dashContext}>{children}</DashContext.Provider>
  );
};

export default DashProvider;
