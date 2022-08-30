import { getAuth } from 'firebase/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../firebase';

export const useGetDataFromFirestore = () => {
  const { currentUser } = getAuth();
  return useCollectionData(collection(db, `${currentUser?.uid}`));
};
