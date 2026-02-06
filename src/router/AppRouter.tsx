import React, { type JSX } from "react";
import { createBrowserRouter, Navigate, RouterProvider, type RouteObject } from "react-router-dom";
import App from "../App";
import Home from "../components/pages/Home";
import Reservations from "../components/pages/Reservations";
import Menu from "../components/pages/Menu";
import DishesList from "../components/sections/dishes/DishesList";

const routes: RouteObject[] = [
    {
        path: '',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'reservation',
                element: <Reservations />,
            },
            {
                path: 'menu',
                element: <Menu />,
                children: [
                    {
                        index: true,
                        element: <Navigate to={'pizza'} replace />,
                    },
                    {
                        path: ':category',
                        element: <DishesList />,
                    },
                ]
            },
            {
                path: '*',
                element: <Navigate to={''} replace />,
            },
        ]
    }
];

const router = createBrowserRouter(routes, { 
    basename: '/moulin-rouge' 
});

function AppRouter(): JSX.Element {
    return (
        <RouterProvider router={router} />
    );
}

export default AppRouter;
