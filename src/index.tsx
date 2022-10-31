import { createRoot } from 'react-dom/client';
import App from 'App';
import 'sass/abstract/_base.scss';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(<App />);
