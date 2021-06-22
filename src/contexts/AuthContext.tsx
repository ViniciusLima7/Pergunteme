import { createContext, ReactNode, useEffect, useState } from "react";
import { auth ,firebase} from "../services/firebase";

//Types
type User = {

  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {

  //User é user ou indefinido
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

//Estados


const [user, setUser] = useState<User>();


//Hooks
  useEffect(() => {

    //Boas Práticas, sempre que usar useEffect uma variável receber o valor a inscrição
   const unsubscribe = auth.onAuthStateChanged(user => {

     //Se user for true
      if (user) {
        const { displayName, photoURL, uid } = user;

        //Se não tem foto ou DisplayName
        if (!displayName || !photoURL) {
          throw new Error("Usuário Não tem Photo ou Nome");
        }
        // Guardar dados do Google em meu User
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })

      }
    })

    // Boas Práticas retornar a inscrição para parar de monitorar.
    return () => {
      unsubscribe();
    }

  }, [])
  
  // Funções 
  async function signInWithGoogle() {

    //provider recebe a autenticação com o google, configurada no firebase;
    const provider = new firebase.auth.GoogleAuthProvider();

    //Login através do Popup
    const result = await auth.signInWithPopup(provider);

    //Se user for true
    if (result.user) {

      const { displayName, photoURL, uid } = result.user;

      //Se não tem foto ou DisplayName
      if (!displayName || !photoURL) {
        throw new Error("Usuário Não tem Photo ou Nome");
      }
      // Guardar dados do Google em meu User
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