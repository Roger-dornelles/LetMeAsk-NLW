import { useContext } from "react";
import { ThemeContext } from "../contexts/ContextTheme"


export const useTheme = ()=>{

    const value = useContext(ThemeContext);

    return value;
}