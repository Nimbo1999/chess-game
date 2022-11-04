import { render } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { ChessProvider } from 'contexts';
import { LocalStorageService } from 'services';

const Providers: React.FC<{ children: React.ReactElement }> = (props) => (
    <ChessProvider storage={new LocalStorageService('test')}>
        <RouterProvider
            router={createMemoryRouter([
                { path: '/', element: props.children },
            ])}
        />
    </ChessProvider>
);

export const renderWithProvider = (element: React.ReactElement) =>
    render(element, {
        wrapper: Providers,
    });

export * from '@testing-library/react';
