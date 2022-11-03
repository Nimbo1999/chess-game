import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { ROUTE_CONSTANTS } from 'constants/Route';

const HomePage = lazy(() => import('./Home/Home'));
const GamePage = lazy(() => import('./Game/Game'));

export const routes: RouteObject[] = [
    {
        path: ROUTE_CONSTANTS.HOME_PAGE,
        element: <HomePage />,
    },
    {
        path: ROUTE_CONSTANTS.GAME_PAGE,
        element: <GamePage />,
    },
];
