'use client'

import { createContext, useState } from "react";
export const myContext = createContext();

const context = ({children})=>
{
    const [userData, setUserData] = useState([]);
    const [login, setLogin] = useState(true);
    
    return(
        <myContext.Provider value={{ login, setLogin, userData, setUserData}}>
            {children}
        </myContext.Provider>
    )
}

export default context;