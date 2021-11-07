import firebaseConfig from "./config/firebaseConfig";
import { initializeApp } from "./config/firebaseConfig";
import { getAuth } from "firebase/auth";
import { getFireStore } from "firebase/firestore";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFireStore(firebaseApp);

export { auth, db };
