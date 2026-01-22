import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../components/pages/Home";
import Reservations from "../components/pages/Reservations";
import Menu from "../components/pages/Menu";
import DishesList from "../components/sections/dishes/DishesList";

const router = createBrowserRouter([
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
                        element: <Navigate to={'pizza'} />
                    },
                    {
                        path: ':category',
                        element: <DishesList />
                    },
                ]
            },
            {
                path: '*',
                element: <Navigate to={''} />,
            },
        ]
    }
], { basename: '/moulin-rouge' })

function AppRouter() {
    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter;