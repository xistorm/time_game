import { Navigate } from "react-router-dom";

import { AppearingLevel, LevelMenu, Login, MovingLevel, Menu, Rating } from './pages';


const noMatchingRoute = {
    path: '*',
    element: <Navigate to='/' />
};

export const loginedRoutes = [
    {
        path: '/',
        element: <Navigate to='/menu' />,
    },
    {
        path: '/menu',
        element: <Menu />,
        title: 'Меню',
    },
    {
        path: '/level',
        element: <LevelMenu />,
    },
    {
        path: '/level/moving',
        element: <MovingLevel />,
    },
    {
        path: '/level/appearing',
        element: <AppearingLevel />,
    },
    {
        path: '/rating',
        element: <Rating />,
    },
    noMatchingRoute
];

export const logoutedRoutes = [
    {
        path: '/',
        element: <Navigate to='/login' />,
    },
    {
        path: '/login',
        element: <Login />,
        title: 'Войти',
    },
    noMatchingRoute
]