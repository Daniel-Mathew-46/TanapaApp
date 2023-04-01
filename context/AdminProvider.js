import React, { createContext, useEffect, useReducer } from "react";
import {
  query,
  collection,
  where,
  db,
  onSnapshot,
  getCountFromServer,
} from "./firebase";

export const AdminDashContext = createContext(null);

const AdminProvider = (props) => {
  const adminStats = {
    katibuCount: null,
    vikundiCount: null,
    cfCount: null,
    loading: false,
  };

  const adminStatsReducer = (prevStates, action) => {
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
      case "SET_CF_COUNT":
        return {
          ...prevStates,
          cfCount: action.count,
        };
    }
  };

  const [stats, dispatch] = useReducer(adminStatsReducer, adminStats);

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

  const _q = query(collection(db, "users"), where("role", "==", "CF"));
  const unSubscribe = onSnapshot(_q, async (querySnap) => {
    const cFCountSnapshot = await getCountFromServer(_q);
    let cfCount = await cFCountSnapshot.data().count;
    if (stats.cfCount !== cfCount)
      dispatch({ type: "SET_CF_COUNT", count: cfCount });
  });

  useEffect(() => {
    return () => {
      unsub;
      unsubscribe;
      unSubscribe;
    };
  }, []);

  const adminContext = React.useMemo(() => ({
    stats,
    dispatch,
  }));

  return (
    <AdminDashContext.Provider value={adminContext}>
      {props?.children}
    </AdminDashContext.Provider>
  );
};

export default AdminProvider;
