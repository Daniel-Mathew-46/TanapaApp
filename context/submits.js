import {
  auth,
  db,
  getDocs,
  addDoc,
  where,
  collection,
  query,
  Timestamp,
} from "./firebase";

export const submitFormData = async (
  collectionName,
  userSubmitted,
  formName,
  formData
) => {
  //   try {
  await addDoc(collection(db, collectionName), {
    userSubmitted,
    formName,
    formData,
    submitDate: Timestamp.fromDate(new Date()),
  });
  //   } catch (e) {
  //     console.log(e)
  //     alert(e.message);
  //   }
};
