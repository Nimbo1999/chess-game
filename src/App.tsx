import { Suspense } from 'react';
import { ChessProvider } from 'contexts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from 'pages';
import { HydrateComponent } from 'components';
import { LocalStorageService } from 'services';

const browserRouter = createBrowserRouter(routes);

const localStorage = new LocalStorageService('matheus_chess_game');

const App: React.FC = () => (
    <ChessProvider storage={localStorage}>
        <HydrateComponent>
            <Suspense fallback={<>Loading...</>}>
                <RouterProvider router={browserRouter} />
            </Suspense>
        </HydrateComponent>
    </ChessProvider>
);

export default App;
