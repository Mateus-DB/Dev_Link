
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAQaVXkuuPpw_kLg8acYZnb6C0Ta6DLdLk",
  authDomain: "reactlinks-c66d9.firebaseapp.com",
  projectId: "reactlinks-c66d9",
  storageBucket: "reactlinks-c66d9.firebasestorage.app",
  messagingSenderId: "650900376249",
  appId: "1:650900376249:web:160b263252334a56a1a968"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore= getFirestore(app)

export {auth, firestore};