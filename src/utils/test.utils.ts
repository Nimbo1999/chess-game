import { render } from '@testing-library/react';
import { ChessProvider } from 'contexts';

export const renderWithProvider = (element: React.ReactElement) =>
    render(element, {
        wrapper: ChessProvider,
    });

export * from '@testing-library/react';
