import { useState } from 'react';
import { Stack } from 'react-bootstrap';
import { formatApiText } from '../../data/pokemon';
import { PokemonLoaderData } from '../../data/InspectLoader';
import StringSelector from './StringSelector';

type IProps = {
  loadData: PokemonLoaderData;
};

function PokemonDescriptions(props: IProps): JSX.Element {
  const { species } = props.loadData;
  const descs = species.flavor_text_entries
    // May add other language support in the future... Would be a lot of work tho :/
    .filter((desc) => desc.language.name === 'en')
    .map((desc) => {
      desc.version.name = formatApiText(desc.version.name);
      return desc;
    });

  const [getVersion, setVersion] = useState(descs[0].version.name);

  // Correct for new pages allowing invalid versions selected by default
  if (!descs.some((d) => d.version.name === getVersion))
    setVersion(descs[0].version.name);

  return (
    <div id='pokemon-overview' className='h-100'>
      <Stack direction='horizontal'>
        <h2 className='text-center m-auto'>Pokedex Entries</h2>
        <StringSelector
          values={descs.map((d) => d.version.name)}
          value={getVersion}
          defaultValue={descs[0].version.name}
          onChange={(v) => setVersion(v)}
        />
      </Stack>

      <hr className='my-2' />
      <h5>
        {descs.find((desc) => desc.version.name === getVersion)?.flavor_text}
      </h5>
    </div>
  );
}

export default PokemonDescriptions;
