import { Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import PokemonSearch from './PokemonSearch';

function Navigation(): JSX.Element {
  return (
    <Navbar bg='primary' variant='dark'>
      <Container className='container-half'>
        <NavbarBrand to={routes.home} as={Link}>
          Pokemon Browser
        </NavbarBrand>

        {/* Aligned Left */}
        <Nav className='me-auto'></Nav>

        {/* Aligned Right */}
        <Nav>
          <PokemonSearch />
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
