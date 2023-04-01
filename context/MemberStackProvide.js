import React, { createContext, useEffect, useReducer } from "react";
import { query, collection, where, getDocs, db, onSnapshot } from "./firebase";

export const KatibuDataContext = createContext(null);

const MemberStackProvide = (props) => {
  const katibuEmail = props?.katibuEmail;

  const initialStates = {
    katibuData: katibuEmail,
    kikundi: {},
    members: [],
    loading: false,
    deleteFlag: false,
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
      // case "SET_MEMBERS":
      //   return {
      //     ...prevStates,
      //     members: [...action.payload],
      //   };
      case "SET_MEMBERS":
        return {
          ...prevStates,
          members: [...action.payload],
          loading: false,
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

  // const q_ = query(
  //   collection(db, "Vikundi"),
  //   where("Katibu", "==", states?.katibuData)
  // );
  // const unsub = onSnapshot(
  //   q_,
  //   async (docs) => {
  //     let members_ = [];
  //     const kikundiDoc = docs.docs?.[0].data();
  //     const kikundiName = kikundiDoc?.name;
  //     if (states.kikundi !== doc)
  //       dispatch({ type: "SET_KIKUNDI", payload: kikundiDoc });
  //     const q = query(
  //       collection(db, "KikundiMembers"),
  //       where("Kikundi Chake", "==", kikundiName)
  //     );
  //     const snapshot = await getDocs(q);
  //     snapshot.forEach((doc) => {
  //       members_.unshift(doc.data());
  //     });
  //     if (states.members !== members_)
  //       dispatch({ type: "SET_MEMBERS", payload: members_ });
  //   },
  //   (error) => {
  //     console.log(error);
  //   }
  // );

  useEffect(() => {
    dispatch({ type: "ACTIVATE_LOADING", loading: true });
    const getKikundiChaKatibu = async (email) => {
      try {
        return getDocs(
          query(collection(db, "Vikundi"), where("Katibu", "==", email))
        );
      } catch (e) {
        alert(e.message);
      }
    };
    getKikundiChaKatibu(katibuEmail)
      .then((docs) => {
        let doc = docs.docs[0].data();
        dispatch({ type: "SET_KIKUNDI", payload: doc });
        let getKikundiMembers = async (kikundiName) => {
          let members_ = [];
          try {
            const q = query(
              collection(db, "KikundiMembers"),
              where("Kikundi Chake", "==", kikundiName)
            );
            const docs = await getDocs(q);
            docs.forEach((doc) => {
              members_.unshift(doc.data());
            });
            dispatch({ type: "SET_MEMBERS", payload: members_ });
          } catch (e) {
            alert(e.message);
          }
        };
        getKikundiMembers(doc.name);
      })
      .catch((e) => {
        dispatch({ type: "ACTIVATE_LOADING", loading: false });
        alert(e.message);
      });
    return () => {
      dispatch({ type: "ACTIVATE_LOADING", loading: false });
      // unsub;
    };
  }, []);

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
