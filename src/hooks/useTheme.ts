import { useContext } from "react";
import {ThemeContext} from "../contexts/ThemeContext";


//Hook Usado para diminuir o número de importações

export function useTheme(){
  const value = useContext(ThemeContext);

  return value;
}