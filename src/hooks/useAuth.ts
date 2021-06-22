import { useContext } from "react";
import {AuthContext} from "../contexts/AuthContext";


//Hook Usado para diminuir o número de importações

export function useAuth(){
  const value = useContext(AuthContext);

  return value;
}