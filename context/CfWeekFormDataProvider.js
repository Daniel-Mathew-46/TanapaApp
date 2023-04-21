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

// Here we need to get vikundi
// and its data
// and the current week

export const CFWeekFormDataContext = createContext(null);

const CfWeekFormDataProvider = (props) => {
  const cfEmail = props?.cfEmail;
  console.log(cfEmail);

  const initialStates = {
    cfEmail,
    vikundiCount: null,
    vikundi: null,
    vikundiData: {},
  };

  const statesReducers = (prevStates, action) => {
    switch (action.type) {
      case "SET_KIKUNDI":
        return {
          ...prevStates,
          kikundi: action.payload,
        };
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

  const [states, dispatch] = useReducer(statesReducers, initialStates);
  console.log(states.vikundi);
  const q_ = query(
    collection(db, "Vikundi"),
    where("createdBy", "==", cfEmail)
  );
  const unsub = onSnapshot(q_, async (doc) => {
    const snapshot = await getCountFromServer(q_);
    let kikundiCount = snapshot.data().count;
    if (states.vikundiCount !== kikundiCount) {
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

  const cfWeekFormContext = React.useMemo(() => ({
    states,
    dispatch,
  }));
  return (
    <CFWeekFormDataContext.Provider value={cfWeekFormContext}>
      {props.children}
    </CFWeekFormDataContext.Provider>
  );
};

export default CfWeekFormDataProvider;
