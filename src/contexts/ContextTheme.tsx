import { createContext,ReactNode, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeContextProviderProps ={
    children:ReactNode;
}
type ThemeContextType = {
    theme: Theme;
    toggleTheme: ()=>void;
}

export const ThemeContext = createContext({} as ThemeContextType);


export const ThemeContextProvider = (props:ThemeContextProviderProps)=>{

    const [ currentTheme, setCurrentTheme ] = useState<Theme>(()=>{
        const themeStorage = localStorage.getItem('theme');
        return (themeStorage ?? 'light')as Theme;
    })

    const toggleTheme = ()=>{
        setCurrentTheme(currentTheme === "light" ? "dark" : "light")
    }

    useEffect(() =>{
        localStorage.setItem('theme', currentTheme)
    },[currentTheme])

    return(
        <ThemeContext.Provider value={{theme:currentTheme, toggleTheme}}>
            {props.children}
        </ThemeContext.Provider>

    )
};