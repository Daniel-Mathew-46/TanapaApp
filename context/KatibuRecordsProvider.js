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

export const KatibuRecordsContext = createContext(null);

const KatibuRecordsProvider = (props) => {
  const cfEmail = props?.cfEmail;
  const katibusDataArray = [];
  const myKatibusState = {
    cfEmail: cfEmail,
    myKatibus: null,
    myVikundis: null,
    loading: false,
    change: null,
  };

  const myKatibusReducer = (prevStates, action) => {
    switch (action.type) {
      case "ACTIVATE_LOADING":
        return {
          ...prevStates,
          loading: action.loading,
        };
      case "SET_KATIBUS":
        return {
          ...prevStates,
          myKatibus: [...action.katibus],
        };
        break;
      case "SET_EMPTY_MEMBERS":
        return {
          ...prevStates,
          katibus: [...action.katibus],
        };
      case "SET_CHANGE":
        return {
          ...prevStates,
          change: action.change,
        };
      case "ADD_KATIBU":
        return {
          ...prevStates,
          myKatibus: [...prevStates.myKatibus, action.katibu],
        };
    }
  };

  const [states, dispatch] = useReducer(myKatibusReducer, myKatibusState);
  const q_ = query(
    collection(db, "users"),
    where("createdBy", "==", states.cfEmail)
  );

  useEffect(() => {
    const unSubscriber = onSnapshot(
      q_,
      async (docSnapshot) => {
        let emails = [];
        const katibusDocs = await getDocs(q_);
        if (katibusDocs.docs.length === 0) {
          dispatch({ type: "SET_EMPTY_MEMBERS", katibus: [] });
        } else {
          try {
            for (let i = 0; i < katibusDocs.docs.length; i++) {
              let nameKik = "";
              let doc = katibusDocs.docs?.reverse()?.[i];
              let katibudataObj = { ...doc.data() };
              let emailKatibu = await doc.data().email;
              emails.unshift(emailKatibu);
              try {
                const docsKikundi = await getDocs(
                  collection(db, "Vikundi"),
                  where("Katibu", "==", emails[i])
                );
                let docKikundi = docsKikundi.docs?.[i].data();
                let nameKikundi = await docKikundi.name;
                katibudataObj["kikundi"] = nameKikundi;
              } catch (e) {
                katibudataObj["kikundi"] = nameKik;
              } finally {
                katibusDataArray[i] = katibudataObj;
              }
            }
          } catch (e) {
            console.log(e);
          }
          if (states.myKatibus !== katibusDataArray)
            dispatch({ type: "SET_KATIBUS", katibus: katibusDataArray });
        }
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unSubscriber();
  }, [states.change]);

  const katibuRecContext = React.useMemo(() => ({
    states,
    dispatch,
  }));
  return (
    <KatibuRecordsContext.Provider value={katibuRecContext}>
      {props.children}
    </KatibuRecordsContext.Provider>
  );
};

export default KatibuRecordsProvider;
