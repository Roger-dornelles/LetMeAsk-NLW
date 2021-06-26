import { createContext, useState, useEffect , ReactNode } from 'react';

import { firebase, auth } from '../services/firebase';

type User = {
    id: string;
    name: string;
    avatar: string;
}
type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: ()=>Promise<void>;
}

type AuthContextProviderProps = {
    children:ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);


export const AuthContextProvider = (props: AuthContextProviderProps)=>{

    const [ user, setUser ] = useState<User>();

    useEffect(() =>{
  
     const unsubscribe = auth.onAuthStateChanged(user =>{
  
        if(user){
          const { displayName, photoURL, uid } = user;
  
          if(!displayName || !photoURL){
  
            throw new Error('missing information from google account');
          }
  
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL,
          });
        }
      })
  
      return ()=>{
        unsubscribe();
      }
    },[]);
  
    const signInWithGoogle = async ()=>{
      const provider = new firebase.auth.GoogleAuthProvider();
  
     const result = await auth.signInWithPopup(provider);
  
        if(result.user){
          const { displayName, photoURL, uid } = result.user;
        
  
          if(!displayName || !photoURL){
            throw new Error('missing information from google account.');
          }
  
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          });
        }
    };

    return (
        <AuthContext.Provider value={{user, signInWithGoogle}}>
            {props.children}
        </AuthContext.Provider>
    )
};