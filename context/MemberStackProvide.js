import React, { createContext, useEffect, useReducer } from "react";
import { query, collection, where, getDocs, db, onSnapshot } from "./firebase";

export const KatibuDataContext = createContext(null);

const MemberStackProvide = (props) => {
  const katibuEmail = props?.katibuEmail;

  const initialStates = {
    katibuData: katibuEmail,
    kikundi: {},
    members: null,
    loading: false,
    deleteFlag: false,
    change: null,
  };

  const statesReducer_ = (prevStates, action) => {
    switch (action.type) {
      case "ACTIVATE_LOADING":
        return {
          ...prevStates,
          loading: action.loading,
        };
      case "SET_KIKUNDI":
        return {
          ...prevStates,
          kikundi: action.payload,
        };
      case "SET_MEMBERS":
        return {
          ...prevStates,
          members: [...action.payload],
          loading: false,
        };
      case "SET_KIKUNDI_MEMBERS":
        return {
          ...prevStates,
          members: [...action.payload],
          kikundi: { ...action.kikundi },
          loading: false,
        };
      case "SET_CHANGE":
        return {
          ...prevStates,
          change: action.change,
        };
      case "ADD_NEW_MEMBER":
        return {
          ...prevStates,
          members: action.payload,
        };
      case "DELETE_MEMBER":
        return {
          ...prevStates,
          deleteFlag: true,
          members: action.remMembers,
        };
      case "UPDATE_MEMBER":
        return {
          ...prevStates,
          members: action.data,
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
          dispatch({
            type: "SET_KIKUNDI_MEMBERS",
            payload: [],
            kikundi: { kikundiName: "", kikundiNamba: "" },
          });
        } else {
          let members_ = [];
          try {
            let {
              ["name"]: kikundiName,
              ["Namba ya usajili ya Kikundi"]: kikundiNamba,
            } = katibusKikundi.docs[0].data();
            const q = query(
              collection(db, "KikundiMembers"),
              where("Kikundi Chake", "==", kikundiName)
            );
            const wanachamaDocs = await getDocs(q);
            if (wanachamaDocs.docs.length === 0) {
              await dispatch({
                type: "SET_KIKUNDI_MEMBERS",
                payload: [],
                kikundi: { name: kikundiName, namba: kikundiNamba },
              });
            } else {
              wanachamaDocs.forEach((doc) => {
                members_.unshift(doc.data());
              });
              if (states.members !== members_)
                dispatch({
                  type: "SET_KIKUNDI_MEMBERS",
                  payload: members_,
                  kikundi: { name: kikundiName, namba: kikundiNamba },
                });
            }
          } catch (e) {
            console.log(e);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unSubScriber();
  }, [states.change]);

  const katibuContext = React.useMemo(() => ({
    states,
    dispatch,
  }));
  return (
    <KatibuDataContext.Provider value={katibuContext}>
      {props.children}
    </KatibuDataContext.Provider>
  );
};

export default MemberStackProvide;
