import React, { createContext, useEffect, useReducer } from "react";
import { query, collection, where, getDocs, db, onSnapshot } from "./firebase";

export const KatibuTasksContexts = createContext(null);

const KatibuTasksProvider = (props) => {
  const katibuEmail = props.katibuEmail;
  const initialStates = {
    katibuData: katibuEmail,
    kikundi: null,
    kikundiData: {},
    members: null,
    canFillForms: null,
    weekNumber: null,
    prevWeekData: {},
  };

  const statesReducer_ = (prevStates, action) => {
    switch (action.type) {
      case "SET_KIKUNDI_MEMBERS":
        return {
          ...prevStates,
          members: [...action.payload],
          kikundi: action.kikundi,
          kikundiData: { ...action.kikundiData },
          loading: false,
        };
      case "SET_PREVWEEK_DATA":
        return {
          ...prevStates,
          prevWeekData: { ...action.prevWeekData },
          canFillForms: true,
          weekNumber: action.prevWeekData.weekNumber + 1,
        };
      case "SET_WAKOPAJI_FORM_STATE":
        return {
          ...prevStates,
          wakopajiFormData: { ...action.data },
          formsFilled: [...action.forms_filled],
        };
      case "SET_LEJA_MFUKO_FORM_STATE":
        return {
          ...prevStates,
          prevWeekData: { ...action.data },
        };
      case "SET_LEJA_HISA_FORM_STATE":
        return {
          ...prevStates,
          prevWeekData: { ...action.data },
        };
      case "SET_MAHUDHURIO_FORM_STATE":
        return {
          ...prevStates,
          prevWeekData: { ...action.data },
        };
      case "SET_SHUGHULI_FORM_STATE":
        return {
          ...prevStates,
          formsFilled: [...action.forms_filled],
        };
    }
  };

  const [states, dispatch] = useReducer(statesReducer_, initialStates);

  const q_ = query(
    collection(db, "Vikundi"),
    where("Katibu", "==", states.katibuData)
  );

  const q = query(collection(db, "KikundiMembers"));

  const unSubScriber = onSnapshot(
    q,
    async (docSnapshot) => {
      let members_ = [];
      let kikundi = "";
      let kikundiData = {};
      const katibusKikundi = await getDocs(q_);
      if (katibusKikundi.docs.length === 0) {
        kikundi = "";
        kikundiData = {};
      } else {
        try {
          let kikundiDoc = katibusKikundi.docs[0].data();
          let kikundiName = await kikundiDoc.name;
          const q = query(
            collection(db, "KikundiMembers"),
            where("Kikundi Chake", "==", kikundiName)
          );
          const wanachamaDocs = await getDocs(q);
          if (wanachamaDocs.docs.length === 0) {
            kikundi = kikundiName;
            kikundiData = { ...kikundiDoc };
          } else {
            wanachamaDocs.forEach((doc) => {
              members_.unshift(doc.data());
            });
            kikundi = kikundiName;
            kikundiData = { ...kikundiDoc };
          }
        } catch (e) {
          console.log(e);
        }
        if (states.members?.length !== members_.length)
          dispatch({
            type: "SET_KIKUNDI_MEMBERS",
            payload: members_,
            kikundi: kikundi,
            kikundiData,
          });
      }
    },
    (error) => {
      console.log(error);
    }
  );

  useEffect(() => {
    return () => {
      unSubScriber();
    };
  }, []);

  const katibuTaskContext = React.useMemo(() => ({
    states,
    dispatch,
  }));

  return (
    <KatibuTasksContexts.Provider value={katibuTaskContext}>
      {props.children}
    </KatibuTasksContexts.Provider>
  );
};

export default KatibuTasksProvider;
