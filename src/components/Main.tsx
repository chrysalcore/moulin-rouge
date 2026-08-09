import React from "react";
import { Outlet } from 'react-router-dom';
import { DataProvider } from '../context/dataContext';
import useConnect from '../hooks/useConnect';
import Loading from './others/Loading';
import Error from './others/Error';

function Main(): React.JSX.Element {
    const [
        loading,
        dishes,
        events,
        categories,
        error,
        handleRetry
    ] = useConnect();

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error onRetry={handleRetry} />;
    }

    return (
        <DataProvider value={{ categories, dishes, events }}>
            <Outlet />
        </DataProvider>
    );
}

export default Main;
