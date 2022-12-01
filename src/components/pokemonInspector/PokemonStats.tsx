import { Container, Stack } from 'react-bootstrap';
import { formatApiText } from '../../data/pokemon';
import { PokemonLoaderData } from '../../data/InspectLoader';

type IProps = {
  loadData: PokemonLoaderData;
};

/**
 * Simple but effective stat display
 */
function PokemonStats(props: IProps): JSX.Element {
  const { pokemon } = props.loadData;
  const stats = pokemon.stats;
  const maxStatVal = Math.max(...stats.map((s) => s.base_stat), 50);

  return (
    <div id='pokemon-stats'>
      <h1 className='text-center'>Stats</h1>
      <hr />
      <Stack className='mb-3'>
        {stats.map((stat) => (
          <Stack direction='horizontal'>
            <h3 className='text-end my-auto' style={{ width: '50%' }}>
              {formatApiText(stat.stat.name)}
            </h3>
            <Container fluid className='m-1'>
              <div
                data-inspector-stat={stat.stat.name}
                style={{
                  width: `${(stat.base_stat / maxStatVal) * 100}%`,
                }}
              >
                <h6 className='my-auto ms-2'>{stat.base_stat}</h6>
              </div>
            </Container>
          </Stack>
        ))}
      </Stack>
    </div>
  );
}

export default PokemonStats;
