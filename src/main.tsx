import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import './index.css';
import App from './App.tsx';

const root = document.getElementById('root')!;
const app = (
    <StrictMode>
        <App />
    </StrictMode>
);

// Production HTML is prerendered (scripts/prerender.mjs) → hydrate. Dev serves an empty root → render.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
