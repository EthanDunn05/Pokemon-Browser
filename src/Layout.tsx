import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import Loading from './pages/Loading';
import { router } from './routes';

function Layout(): JSX.Element {
  // This is a state to promt react to render when done or starting loading
  const [getLoading, setLoading] = useState(false);

  // Set loading to if the state is now laoding
  router.subscribe((state) => {
    setLoading(state.navigation.state === 'loading');
  });

  return (
    <div className='bootstrap-dark'>
      <Navigation />

      <Container>{getLoading ? <Loading /> : <Outlet />}</Container>
    </div>
  );
}
export default Layout;
