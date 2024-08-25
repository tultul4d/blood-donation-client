import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth,  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase-config";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";

 export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleSignIn = () =>{
        setLoading(true);
      return signInWithPopup(auth, googleProvider);
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
     return   updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    useEffect( () =>{
   const unsubscribe =  onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            if(currentUser){
                // get store 
                const userInfo = {email: currentUser.email};
                axiosPublic.post('/jwt', userInfo )
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                    }
                })
            }
            else{
            //    do 
            localStorage.removeItem('access-token');
            }
            // console.log('current user' , currentUser);
            setLoading(false);
        });
        return () =>{
            return unsubscribe();
        }
    }, [])
    const authInfo = {
         user,
         loading,
         createUser,
      signIn,
      logOut,
      googleSignIn,
      updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
