import { Container } from 'react-bootstrap';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import Navigation from '../../components/Navigation';

function BadGateway(): JSX.Element {
  const error = useRouteError();
  if (isRouteErrorResponse(error))
    return (
      <>
        <Navigation />

        <Container>
          <h1 className='text-center'>{`${error.status} ${error.statusText}`}</h1>
          <p>{error.data}</p>
        </Container>
      </>
    );

  return (
    <>
      <Navigation />

      <Container>
        <h1 className='text-center'>Something went wrong!</h1>
        <p>{JSON.stringify(error)}</p>
      </Container>
    </>
  );
}
export default BadGateway;
