import React from "react";
import { createContext, useContext, ReactNode } from "react";
import type { DataContextValue } from "../types";

type Props = {
    children: React.ReactNode
    value: DataContextValue
}

const initialValue: DataContextValue = {
    categories: [],
    dishes: [],
    events: []
}

const DataContext = createContext(initialValue)

export function DataProvider({ children, value  }: Props): ReactNode {
    return (
        <DataContext.Provider value={value} >
            {children}
        </DataContext.Provider>
    )
}

export function useData(): DataContextValue {
    return useContext(DataContext)
}