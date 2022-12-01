import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import BadGateway from './pages/errors/BadGateway';
import { PokemonInspectionErrorPage } from './pages/errors/PokemonInspectionError';
import Home from './pages/Home';
import PokemonInspect from './pages/PokemonInspect';
import { pokeLoader } from './data/InspectLoader';

// Route Definition
export const routes = {
  home: '/',
  pokemon: '/pokemon',
};

// Create a router from the definition
export const router = createBrowserRouter([
  {
    // Header that all routes use
    path: routes.home,
    element: <Layout />,
    errorElement: <BadGateway />,
    children: [
      { path: routes.home, element: <Home /> },
      {
        path: routes.pokemon + '/:id',
        element: <PokemonInspect />,
        loader: pokeLoader,
        errorElement: <PokemonInspectionErrorPage />,
      },
    ],
  },
]);
