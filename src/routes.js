import { Navigate } from "react-router-dom";

import { Login } from './pages';


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
        // element: <Menu />,
        title: 'Меню',
    },
    {
        path: '/level',
        // element: <Level />,
    },
    {
        path: '/rating',
        // element: <Rating />
        title: 'Рейтинг'
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