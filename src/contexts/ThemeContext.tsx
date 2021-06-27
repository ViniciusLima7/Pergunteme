import { createContext, ReactNode, useEffect, useState } from "react";

//Types
type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
  children: ReactNode;
}

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {
//Iniciar Theme com valor em local Storage
  const [currentTheme, setCurrentTheme] = useState<Theme>(() =>{
      const storageTheme = localStorage.getItem('theme');

      return (storageTheme ?? 'light') as Theme;
  });

  //Toda vez que o tema mudar salvar em localStorage
  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  },[currentTheme])


  function toggleTheme() {
    setCurrentTheme(currentTheme === 'light' ? ('dark') : ('light'));
  }

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}