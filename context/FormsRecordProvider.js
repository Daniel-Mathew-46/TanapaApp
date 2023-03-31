import { View, Text } from "react-native";
import React, { createContext, useEffect, useReducer } from "react";
import {
  query,
  collection,
  where,
  getDocs,
  db,
  onSnapshot,
  doc,
  limit,
  orderBy,
} from "./firebase";

export const FormsDataContext = createContext(null);

const FormsRecordProvider = (props) => {
  const katibuEmail = props?.katibuEmail;

  const formsStates = {
    katibuData: katibuEmail,
    weeks: [],
    forms: [],
    loading: false,
    formsLoading: false,
    formDatas: [],
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
          forms: [...action.formsPayload],
          loading: false,
        };
      case "SET_FORMS":
        return {
          ...prevStates,
          formDatas: [...action.payload],
          formsLoading: false,
        };
    }
  };

  const [states, dispatch] = useReducer(formStatesReducer_, formsStates);
  useEffect(() => {
    dispatch({ type: "ACTIVATE_LOADING", loading: true });
    const getWeeks = async (email) => {
      let forms = [];
      let formsObj = {};
      let weeks = [];
      try {
        const docs = await getDocs(
          query(
            collection(db, "WeeksForms"),
            where("Katibu", "==", email),
            limit(10)
          )
        );
        docs.forEach((doc_) => {
          let week = doc_.data().week;
          weeks.push(week);
          formsObj[week] = doc_.data().forms;
        });
        forms.push(formsObj);
        weeks.sort(function (a, b) {
          return a - b;
        });
        dispatch({ type: "SET_WEEKS", payload: weeks, formsPayload: forms });
      } catch (e) {
        dispatch({ type: "ACTIVATE_LOADING", loading: false });
        alert(e.message);
      }
    };
    getWeeks(katibuEmail);
    // .then((forms) => {
    //   let getFormsData = async (form) => {
    //     let members_ = [];
    //     try {
    //       const q = query(
    //         collection(db, "KikundiMembers"),
    //         where("Kikundi Chake", "==", kikundiName)
    //       );
    //       const docs = await getDocs(q);
    //       docs.forEach((doc) => {
    //         members_.unshift(doc.data());
    //       });
    //       dispatch({ type: "SET_MEMBERS", payload: members_ });
    //     } catch (e) {
    //       alert(e.message);
    //     }
    //   };
    //   getKikundiMembers(doc.name);
    // })
    // .catch((e) => {
    //   dispatch({ type: "ACTIVATE_LOADING", loading: false });
    //   alert(e.message);
    // });
    return () => {
      dispatch;
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
