import React, { createContext, useState, useContext } from 'react';

const CountContext = createContext();

export default function CountProvider( {children} ) {
    const [count, setCount] = useState(0);

    return(
        <CountContext.Provider 
            value={{
                count, 
                setCount
            }}
        >
            { children }
        </CountContext.Provider>
    );
}

// criando meu proprio hook
export function useCount(){
    const context = useContext(CountContext);
    if(!context) throw new Error("Use must be used within a CounterProvider");
    const { count, setCount } = context;
    return { count, setCount };
}