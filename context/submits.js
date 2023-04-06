import {
  auth,
  db,
  getDocs,
  addDoc,
  where,
  collection,
  query,
  Timestamp,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "./firebase";

//Submit Forms Data
export const submitFormData = async (
  collectionName,
  userSubmitted,
  formName,
  docName,
  week,
  formData
) => {
  //   try {
  await setDoc(doc(collection(db, collectionName), docName), {
    userSubmitted,
    formName,
    formData,
    submitDate: Timestamp.fromDate(new Date()),
  });
  const docs = await getDocs(
    query(
      collection(db, "WeeksForms"),
      where("Katibu", "==", userSubmitted),
      where("week", "==", week)
    )
  );
  if (docs.docs.length === 0) {
    // means there is no week submission by this Katibu
    await addDoc(collection(db, "WeeksForms"), {
      Katibu: userSubmitted,
      forms: [docName],
      week,
    });
  } else {
    const doc_ = docs.docs[0];
    let docId = doc_.id;
    let forms_ = doc_.data().forms;
    forms_ = [...forms_, docName];
    await updateDoc(doc(db, "WeeksForms", docId), {
      Katibu: userSubmitted,
      forms: forms_,
      week,
    });
  }
  // })
  // .catch(e => {
  //   alert(e.message)
  // })
};

//Submit Members Data
export const submitMembersData = async (
  formerEmail = null,
  kikundi,
  formData,
  update = false,
  dispatch,
  currMembers,
  change
) => {
  if (update == true) {
    const docs = await getDocs(
      query(
        collection(db, "KikundiMembers"),
        where("Barua Pepe", "==", formerEmail)
      )
    );
    const _doc = docs.docs[0];
    const updateMember = async (docId) => {
      try {
        await updateDoc(doc(db, "KikundiMembers", docId), {
          "Kikundi Chake": kikundi,
          ...formData,
        });
        await dispatch({
          type: "SET_CHANGE",
          change: change,
        });
      } catch (e) {
        alert(e.message);
      }
    };
    await updateMember(_doc.id);
  } else {
    await addDoc(collection(db, "KikundiMembers"), {
      "Kikundi Chake": kikundi,
      ...formData,
    });
  }
};

//Delete Member
export const deleteMember = async (email) => {
  const docs = await getDocs(
    query(collection(db, "KikundiMembers"), where("Barua Pepe", "==", email))
  );
  const _doc = docs.docs[0];
  const deleteMember = async (docId) => {
    try {
      await deleteDoc(doc(db, "KikundiMembers", docId));
    } catch (e) {
      alert(e.message);
    }
  };
  await deleteMember(_doc.id);
};

//updateMember
export const updateKatibu = async (email, formData, change, dispatch) => {
  const docs = await getDocs(
    query(collection(db, "users"), where("email", "==", email))
  );
  const _doc = docs.docs[0];
  const updateKatibuInfo = async (docId) => {
    try {
      await updateDoc(doc(db, "users", docId), {
        ...formData,
      });
      await dispatch({
        type: "SET_CHANGE",
        change: change,
      });
    } catch (e) {
      alert(e.message);
    }
  };
  updateKatibuInfo(_doc.id);
};
