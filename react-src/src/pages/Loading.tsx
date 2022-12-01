import { Spinner } from 'react-bootstrap';

function Loading(): JSX.Element {
  return (
    <div className='mt-4'>
      <h1 className='text-center my-auto'>
        <Spinner animation='border' />
        {'  Loading...'}
      </h1>
    </div>
  );
}

export default Loading;
