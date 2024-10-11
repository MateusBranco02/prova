import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Times from './pages/Times.jsx';
import ListaJogadores from './pages/Lista-jogadores.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Times /> },
  { path: '/jogadores/:id', element: <ListaJogadores /> }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
