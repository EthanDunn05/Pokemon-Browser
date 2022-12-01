import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { formatApiText } from '../../data/pokemon';
import { PokemonLoaderData } from '../../data/InspectLoader';
import { routes } from '../../routes';

interface IProps {
  loadData: PokemonLoaderData;
}

/**
 * Simple little header component
 */
function PokemonHeader(props: IProps): JSX.Element {
  const { pokemon, type1, type2 } = props.loadData;
  const navigate = useNavigate();

  function goToId(pokemonId: number): void {
    navigate(`${routes.pokemon}/${pokemonId}`);
  }

  return (
    <Stack
      direction='horizontal'
      className='mb-3 border border-2 rounded shadow-md bg-primary'
    >
      {pokemon.id > 1 && (
        // Don't allow to go from Bulbasaur to id 0
        <Button onClick={() => goToId(pokemon.id - 1)}>Back</Button>
      )}

      <Stack direction='horizontal' className='m-auto py-1'>
        <h2 className='my-auto'>{pokemon.name} - </h2>

        <h2 className='ms-2 me-1' data-inspector-type={type1.name}>
          {formatApiText(type1.name)}
        </h2>
        {type2 && (
          // Only render if the pokemon has a second type
          <h2 className='mx-1' data-inspector-type={type2.name}>
            {formatApiText(type2.name)}
          </h2>
        )}
      </Stack>

      <Button onClick={() => goToId(pokemon.id + 1)}>Next</Button>
    </Stack>
  );
}

export default PokemonHeader;
