import React, { createContext, useEffect, useReducer, useMemo } from "react";
import {
  query,
  collection,
  where,
  db,
  onSnapshot,
  getCountFromServer,
} from "./firebase";

export const CFDashContext = createContext(null);

const CFProvider = (props) => {
  const cfStats = {
    katibuCount: null,
    vikundiCount: null,
    loading: false,
  };

  const cfStatsReducer = (prevStates, action) => {
    switch (action.type) {
      case "ACTIVATE_LOADING":
        return {
          ...prevStates,
          loading: action.loading,
        };
      case "SET_KATIBU_COUNT":
        return {
          ...prevStates,
          katibuCount: action.count,
        };
      case "SET_VIKUNDI_COUNT":
        return {
          ...prevStates,
          vikundiCount: action.count,
        };
    }
  };

  const [stats, dispatch] = useReducer(cfStatsReducer, cfStats);
  const q_ = query(collection(db, "Vikundi"));
  const unsub = onSnapshot(q_, async (doc) => {
    const snapshot = await getCountFromServer(q_);
    let kikundiCount = await snapshot.data().count;
    if (stats.vikundiCount !== kikundiCount)
      dispatch({ type: "SET_VIKUNDI_COUNT", count: kikundiCount });
  });

  const q = query(collection(db, "users"), where("role", "==", "Katibu"));
  const unsubscribe = onSnapshot(q, async (querySnapshot) => {
    const katibuCountSnapshot = await getCountFromServer(q);
    let katibuCount = await katibuCountSnapshot.data().count;
    if (stats.katibuCount !== katibuCount)
      dispatch({ type: "SET_KATIBU_COUNT", count: katibuCount });
  });

  useEffect(() => {
    return () => {
      unsub;
      unsubscribe;
    };
  }, []);

  const cfContext = React.useMemo(() => ({
    stats,
    dispatch,
  }));
  return (
    <CFDashContext.Provider value={cfContext}>
      {props?.children}
    </CFDashContext.Provider>
  );
};

export default CFProvider;
