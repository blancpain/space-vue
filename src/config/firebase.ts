import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE,
  authDomain: 'space-view-ydimitrov.firebaseapp.com',
  projectId: 'space-view-ydimitrov',
  storageBucket: 'space-view-ydimitrov.appspot.com',
  messagingSenderId: '482619231336',
  appId: '1:482619231336:web:c36bb064862161797f7fdd'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
