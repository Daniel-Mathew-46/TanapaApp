import React, { createContext, useState } from "react";
import { query, collection, where, getDocs, db } from "./firebase";

export const KatibuDataContext = createContext(null);

const MemberStackProvide = (props) => {
  const katibuEmail = props?.katibuEmail;
  const [katibuData, setKatibuData] = useState(katibuEmail);
  const [kikundi, setKikundi] = useState({});
  const [members, setMembers] = useState([]);

  const katibuContext = React.useMemo(() => ({
    katibuData,
    kikundi,
    members,
    setMembers,
    setKatibuData,
    setKikundi,
    getKikundiChaKatibu: async (email) => {
      try {
        return getDocs(
          query(collection(db, "Vikundi"), where("Katibu", "==", email))
        );
      } catch (e) {
        alert(e.message);
      }
    },
  }));
  return (
    <KatibuDataContext.Provider value={katibuContext}>
      {props.children}
    </KatibuDataContext.Provider>
  );
};

export default MemberStackProvide;
