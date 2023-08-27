import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

/**
 * Get the DOM node with the id 'root'.
 *
 * @type {HTMLElement} The root DOM element.
 */
const domNode = document.getElementById('root');

/**
 * Create a root instance to render the app.
 *
 * @type {Root} The root instance.
 */
const root = createRoot(domNode);

/**
 * Render the App component into the root.
 *
 * @returns {void}
 */
root.render(<App />);
