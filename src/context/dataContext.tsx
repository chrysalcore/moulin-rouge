import { createContext, useContext, ReactNode, JSX } from "react";

type Props = {
    children: ReactNode,
    value: {
        categories: string[],
        dishes: object[],
        events: object[]
    }
}

const initialValue: Props['value'] = {
    categories: [],
    dishes: [],
    events: []
}

const DataContext = createContext(initialValue)

export function DataProvider({ children, value  }: Props): JSX.Element {
    return (
        <DataContext.Provider value={value} >
            {children}
        </DataContext.Provider>
    )
}

export function useData(): Props['value'] {
    return useContext(DataContext)
}