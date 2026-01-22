import { createContext, useContext } from "react";

const DataContext = createContext({
    categories: [],
    dishes: [],
    events: []
})

export function DataProvider({ children, value }) {
    return (
        <DataContext.Provider value={value} >
            {children}
        </DataContext.Provider>
    )
}

export function useData() {
    return useContext(DataContext)
}