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
          forms: action.formsPayload,
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
    where("Katibu", "==", states.katibuData),
    limit(10)
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
        let forms = [];
        let formsObj = {};
        let weeks = [];
        try {
          weeksDocs.forEach(async (doc_) => {
            let week = doc_.data().week;
            weeks.push(week);
            formsObj[week] = await doc_.data().forms;
          });
          forms.push(formsObj);
          weeks.sort(function (a, b) {
            return a - b;
          });

          if (states.weeks !== weeks || states?.forms !== forms)
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
    // const UnSubscriber = onSnapshot(
    //   q,
    //   async (docSnapshot) => {
    //     const weeksDocs = await getDocs(q);
    //     if (weeksDocs.docs.length === 0) {
    //       dispatch({ type: "SET_WEEKS", payload: [], formsPayload: [] });
    //     } else {
    //       let forms = [];
    //       let formsObj = {};
    //       let weeks = [];
    //       try {
    //         weeksDocs.forEach((doc_) => {
    //           let week = doc_.data().week;
    //           weeks.push(week);
    //           formsObj[week] = doc_.data().forms;
    //         });
    //         forms.push(formsObj);
    //         weeks.sort(function (a, b) {
    //           return a - b;
    //         });

    //         if (states.weeks !== weeks || states?.forms !== forms)
    //           dispatch({
    //             type: "SET_WEEKS",
    //             payload: weeks,
    //             formsPayload: forms,
    //           });
    //       } catch (e) {
    //         console.log(e);
    //       }
    //     }
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
    // -----------
    // dispatch({ type: "ACTIVATE_LOADING", loading: true });
    // const getWeeks = async (email) => {
    // let forms = [];
    // let formsObj = {};
    // let weeks = [];
    //   try {
    //     const docs = await getDocs(q);
    // docs.forEach((doc_) => {
    //   let week = doc_.data().week;
    //   weeks.push(week);
    //   formsObj[week] = doc_.data().forms;
    // });
    // forms.push(formsObj);
    // weeks.sort(function (a, b) {
    //   return a - b;
    // });
    // dispatch({ type: "SET_WEEKS", payload: weeks, formsPayload: forms });
    //   } catch (e) {
    //     dispatch({ type: "ACTIVATE_LOADING", loading: false });
    //     alert(e.message);
    //   }
    // };
    // getWeeks(katibuEmail);
    return () => {
      unsub();
    };
  }, []);

  console.log(states.forms);
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
