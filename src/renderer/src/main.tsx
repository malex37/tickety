import ReactDOM from 'react-dom/client';
import './assets/index.css';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';

const debugId = 'debugwindow';
document.addEventListener('keydown', (event) => {
    if (event.repeat) {
      console.log(`Repeat event for key ${event.key}, ignoring`);
      return;
    }
    if (event.key === 'F1') {
      const debugModal = document.getElementById(debugId);
      // @ts-ignore next-line
      if (debugModal && !debugModal.open) {
        // @ts-ignore next-line
        debugModal.showModal();
      }
    }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <RouterProvider router={Router} />
  // </React.StrictMode>
)
