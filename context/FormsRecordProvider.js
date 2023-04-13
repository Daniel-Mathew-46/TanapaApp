import React, { createContext, useEffect, useReducer } from "react";
import {
  query,
  collection,
  where,
  getDocs,
  db,
  onSnapshot,
  limit,
  getCountFromServer,
} from "./firebase";

export const FormsDataContext = createContext(null);

const FormsRecordProvider = (props) => {
  const katibuEmail = props?.katibuEmail;

  const formsStates = {
    katibuData: katibuEmail,
    formsCount: null,
    weeks: null,
    forms: null,
    formDatas: null,
    deleteFlag: false,
  };

  const formStatesReducer_ = (prevStates, action) => {
    switch (action.type) {
      case "ACTIVATE_LOADING":
        return {
          ...prevStates,
          loading: action.loading,
        };
      case "ACTIVATE_FORMLOADING":
        return {
          ...prevStates,
          formsLoading: action.loading,
        };
      case "SET_WEEKS":
        return {
          ...prevStates,
          weeks: [...action.payload],
          formsCount: action.count,
          forms: [...action.formsPayload],
        };
      case "SET_FORMS":
        return {
          ...prevStates,
          formDatas: [...action.payload],
        };
    }
  };

  const [states, dispatch] = useReducer(formStatesReducer_, formsStates);
  const q = query(
    collection(db, "WeeksForms"),
    where("Katibu", "==", states.katibuData)
  );

  const q_ = query(collection(db, "FormDocs"));

  const unsub = onSnapshot(q_, async (doc) => {
    const snapshot = await getCountFromServer(q_);
    let formsCount = snapshot.data().count;
    if (states.formsCount !== formsCount) {
      const weeksDocs = await getDocs(q);
      if (weeksDocs.docs.length === 0) {
        dispatch({
          type: "SET_WEEKS",
          count: formsCount,
          payload: [],
          formsPayload: [],
        });
      } else {
        try {
          const forms = [];
          const formsObj = {};
          const weeks = [];
          for (let i = 0; i < weeksDocs.docs.length; i++) {
            let doc_ = weeksDocs.docs[i];
            let week = await doc_.data().week;
            let forms_ = await doc_.data().forms;
            weeks.push(week);
            formsObj[week] = [...forms_];
          }
          weeks.sort(function (a, b) {
            return a - b;
          });
          forms.push(formsObj);
          if (states.weeks?.length !== weeks?.length)
            dispatch({
              type: "SET_WEEKS",
              count: formsCount,
              payload: weeks,
              formsPayload: forms,
            });
        } catch (e) {
          console.log(e);
        }
      }
    }
  });

  useEffect(() => {
    return () => {
      unsub;
    };
  }, []);

  const formsContext = React.useMemo(() => ({
    states,
    dispatch,
  }));
  return (
    <FormsDataContext.Provider value={formsContext}>
      {props.children}
    </FormsDataContext.Provider>
  );
};

export default FormsRecordProvider;
