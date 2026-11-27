import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

/** Build-time prerender (scripts/prerender.mjs): the hero/LCP heading ships as HTML instead of waiting for JS. */
export function render() {
    return renderToString(
        <StrictMode>
            <App />
        </StrictMode>,
    );
}
