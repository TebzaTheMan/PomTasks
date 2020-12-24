import { useReducer, useEffect } from 'react';
import { db } from '../firebase';
// eslint-disable-next-line no-console
console.log('FireStore is been used!');
export default function useFireStoreReducer(key, reducer, defaultValue, userUid) {
  async function getDocument() {
    const usersRef = db.collection('users').doc(userUid);
    const doc = await usersRef.get();
    if (!doc.exists) {
      return defaultValue;
    }
    const data = doc.data();
    return data[key];
  }
  const [state, dispatch] = useReducer(reducer, defaultValue, getDocument());
  useEffect(() => {
    db.collection('users').doc(userUid).update({ [key]: state });
  }, [key, state]);

  return [state, dispatch];
}
