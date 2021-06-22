import { createContext, Provider, ReactNode, useEffect, useState } from "react";
import { auth ,firebase} from "../services/firebase";
type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {


  const [user, setUser] = useState<User>();

  useEffect(() => {
    //Boas Práticas, sempre que usar useEffect uma variável receber o valor
   const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;
        //Se não tem foto ou DisplayName
        if (!displayName || !photoURL) {
          throw new Error("Usuário Não tem Photo ou Nome");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })

      }
    })

    return () => {
      unsubscribe();
    }

  }, [])

  async function signInWithGoogle() {
    //provider recebe a autenticação com o google;
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      //Se não tem foto ou DisplayName
      if (!displayName || !photoURL) {
        throw new Error("Usuário Não tem Photo ou Nome");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }

  }
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}