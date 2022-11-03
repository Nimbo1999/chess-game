import { lazy } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';

const GamePage = lazy(() => import('./Game/Game'));

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to="game" replace />,
    },
    {
        path: 'game',
        element: <GamePage />,
    },
];
