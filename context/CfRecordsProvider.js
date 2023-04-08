import React, { createContext, useEffect, useReducer } from "react";
import {
  query,
  collection,
  where,
  getDocs,
  db,
  onSnapshot,
  getCountFromServer,
} from "./firebase";

export const CFRecordsContext = createContext(null);
const CfRecordsProvider = (props) => {
  const adminEmail = props?.adminEmail;
  //   const cFsDataArray = [];
  const myCfsState = {
    adminEmail: adminEmail,
    myCfs: null,
    loading: false,
    change: null,
  };

  const myCFsReducer = (prevStates, action) => {
    switch (action.type) {
      case "ACTIVATE_LOADING":
        return {
          ...prevStates,
          loading: action.loading,
        };
      case "SET_CFS":
        return {
          ...prevStates,
          myCfs: [...action.cFs],
        };
        break;
      case "SET_EMPTY_CFS":
        return {
          ...prevStates,
          myCfs: [...action.cFs],
        };
      case "SET_CHANGE":
        return {
          ...prevStates,
          change: action.change,
        };
      //   case "ADD_KATIBU":
      //     return {
      //       ...prevStates,
      //       myKatibus: [...prevStates.myKatibus, action.katibu],
      //     };
    }
  };

  const [states, dispatch] = useReducer(myCFsReducer, myCfsState);

  const q_ = query(
    collection(db, "users"),
    where("createdBy", "==", states.adminEmail)
  );

  useEffect(() => {
    const UnSubScribe = onSnapshot(
      q_,
      async (docSnapshot) => {
        const cFsDocs = await getDocs(q_);

        if (cFsDocs.docs.length === 0) {
          dispatch({ type: "SET_EMPTY_CFS", cFs: [] });
        } else {
          let emails = [];
          let cFsArray = [];
          for (let i = 0; i < cFsDocs.docs.length; i++) {
            let cfDoc = cFsDocs.docs[i];
            let cfDataObj = { ...cfDoc.data() };
            let emailCf = await cfDoc.data().email;
            emails.unshift(emailCf);
            let katibuEmails = [];
            const katibuWakeDocs = await getDocs(
              query(collection(db, "users"), where("createdBy", "==", emailCf))
            );
            if (katibuWakeDocs.docs.length === 0) {
              cfDataObj["Makatibu Wake"] = katibuEmails;
            } else {
              katibuWakeDocs.forEach(async (doc_) => {
                let katibu_name = await doc_.data().name;
                katibuEmails.push(katibu_name);
              });
              cfDataObj["Makatibu Wake"] = katibuEmails;
            }

            cFsArray.push(cfDataObj);
          }

          if (states.myCfs !== cFsArray)
            dispatch({ type: "SET_CFS", cFs: cFsArray });
        }
      },
      (error) => {
        console.log(error);
      }
    );
    return () => UnSubScribe();
  }, [states.change]);

  const cfRecsContext = React.useMemo(() => ({
    states,
    dispatch,
  }));

  return (
    <CFRecordsContext.Provider value={cfRecsContext}>
      {props.children}
    </CFRecordsContext.Provider>
  );
};

export default CfRecordsProvider;
