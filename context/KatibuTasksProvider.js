import React, { createContext, useEffect, useReducer } from "react";
import { query, collection, where, getDocs, db, onSnapshot } from "./firebase";

export const KatibuTasksContexts = createContext(null);

const KatibuTasksProvider = (props) => {
  const katibuEmail = props.katibuEmail;
  const initialStates = {
    katibuData: katibuEmail,
    kikundi: {},
    members: null,
  };

  const statesReducer_ = (prevStates, action) => {
    switch (action.type) {
      case "SET_KIKUNDI_MEMBERS":
        return {
          ...prevStates,
          members: [...action.payload],
          kikundi: action.kikundi,
          loading: false,
        };
    }
  };

  const [states, dispatch] = useReducer(statesReducer_, initialStates);

  const q_ = query(
    collection(db, "Vikundi"),
    where("Katibu", "==", states.katibuData)
  );

  useEffect(() => {
    const unSubScriber = onSnapshot(
      q_,
      async (docSnapshot) => {
        const katibusKikundi = await getDocs(q_);
        if (katibusKikundi.docs.length === 0) {
          dispatch({ type: "SET_KIKUNDI_MEMBERS", payload: [], kikundi: "" });
        } else {
          let members_ = [];
          try {
            let kikundiDoc = katibusKikundi.docs[0].data();
            let kikundiName = await kikundiDoc.name;
            const q = query(
              collection(db, "KikundiMembers"),
              where("Kikundi Chake", "==", kikundiName)
            );
            const wanachamaDocs = await getDocs(q);
            if (wanachamaDocs.docs.length === 0) {
              await dispatch({
                type: "SET_KIKUNDI_MEMBERS",
                payload: [],
                kikundi: kikundiName,
              });
            } else {
              wanachamaDocs.forEach((doc) => {
                members_.unshift(doc.data());
              });
              await dispatch({
                type: "SET_KIKUNDI_MEMBERS",
                payload: members_,
                kikundi: kikundiName,
              });
            }
          } catch (e) {
            console.log(e);
          }
          if (states.members !== members_)
            dispatch({
              type: "SET_KIKUNDI_MEMBERS",
              payload: members_,
            });
        }
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unSubScriber();
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
