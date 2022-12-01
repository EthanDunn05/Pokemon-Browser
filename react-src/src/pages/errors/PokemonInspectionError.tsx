import { useRouteError } from 'react-router-dom';

export class PokemonInspectionError {
  id: unknown;
  message: string;

  constructor(id: unknown, message: string) {
    this.id = id;
    this.message = message;
  }
}

export function PokemonInspectionErrorPage(): JSX.Element {
  const error = useRouteError();

  // Only handle the error I want to.
  if (!(error instanceof PokemonInspectionError)) throw error;

  return (
    <div>
      <h1 className='text-center'>
        There was an issue finding the requested pokemon.
      </h1>
      <hr />
      <h3>The following reason was given for the error:</h3>
      <h3>{error.message}</h3>
    </div>
  );
}
