import { getFirestore, setDoc, doc } from 'firebase/firestore';
import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const auth = getAuth(firebase_app);

export default async function signUp(email: string, displayName: string, password: string) {
    const auth = getAuth(firebase_app);
    const db = getFirestore(firebase_app);

    let result = null;
    let error = null;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            email,
            displayName,
            role: "user"
        })

        result = user;
    } catch (err) {
        error = err;
    }
    return { result, error };
}