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
  formData
) => {
  //   try {
  await setDoc(doc(collection(db, collectionName), docName), {
    userSubmitted,
    formName,
    formData,
    submitDate: Timestamp.fromDate(new Date()),
  });
};

//Submit Members Data
export const submitMembersData = async (
  formerEmail = null,
  kikundi,
  formData,
  update = false
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
