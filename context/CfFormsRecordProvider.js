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

export const CfFormsDataContext = createContext(null);

const CfFormsRecordProvider = (props) => {
  const cfEmail = props?.cfEmail;
  const cfFormsStates = {
    cfEmail,
    vikundiCount: null,
    vikundi: null,
    vikundiData: {},
  };

  const cfFormsReducer = (prevStates, action) => {
    switch (action.type) {
      case "ACTIVATE_LOADING":
        return {
          ...prevStates,
          loading: action.loading,
        };
      case "SET_VIKUNDI":
        return {
          ...prevStates,
          vikundiCount: action.count,
          vikundi: action.vikundi,
        };
      case "SET_WEEKS_DATA":
        return {
          ...prevStates,
          vikundiData: { ...action.weeksData },
        };
      case "SET_FORMS_DATA":
        return {
          ...prevStates,
          formDatas: [...action.payload],
        };
    }
  };

  const [statesVikundi, dispatch] = useReducer(cfFormsReducer, cfFormsStates);
  const q_ = query(
    collection(db, "Vikundi"),
    where("createdBy", "==", cfEmail)
  );
  const unsub = onSnapshot(q_, async (doc) => {
    const snapshot = await getCountFromServer(q_);
    let kikundiCount = snapshot.data().count;
    if (statesVikundi.vikundiCount !== kikundiCount) {
      const vikundiDocs = await getDocs(q_);
      if (vikundiDocs.docs.length === 0) {
        dispatch({ type: "SET_VIKUNDI", count: kikundiCount, vikundi: [] });
      } else {
        let vikundi = [];
        vikundiDocs.forEach((doc) => {
          let kikundi = doc.data();
          vikundi.push(kikundi);
        });
        dispatch({
          type: "SET_VIKUNDI",
          count: kikundiCount,
          vikundi: [...vikundi],
        });
      }
    }
  });

  useEffect(() => {
    return () => {
      unsub;
    };
  }, []);

  const cfFormsContext = React.useMemo(() => ({
    statesVikundi,
    dispatch,
  }));
  return (
    <CfFormsDataContext.Provider value={cfFormsContext}>
      {props?.children}
    </CfFormsDataContext.Provider>
  );
};

export default CfFormsRecordProvider;
