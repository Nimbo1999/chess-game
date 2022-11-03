import { Suspense } from 'react';
import { ChessProvider } from 'contexts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from 'pages';

const browserRouter = createBrowserRouter(routes);

const App: React.FC = () => (
    <ChessProvider>
        <Suspense fallback={<>Loading...</>}>
            <RouterProvider router={browserRouter} />
        </Suspense>
    </ChessProvider>
);

export default App;
