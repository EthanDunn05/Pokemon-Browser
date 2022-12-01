import { ImageIcon } from '@primer/octicons-react';
import { useState } from 'react';
import {
  Image,
  Ratio,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import { PokemonLoaderData } from '../../data/InspectLoader';
import { PokemonInspectionError } from '../../pages/errors/PokemonInspectionError';

type IProps = {
  loadData: PokemonLoaderData;
};

/**
 * Renders the pokemon's icon with the choice of official or sprite
 */
function PokemonIcon(props: IProps): JSX.Element {
  const { pokemon } = props.loadData;

  const hasOfficialArt =
    (pokemon.sprites.other?.['official-artwork'] ?? undefined) !== undefined;
  const [getArtType, setArtType] = useState<string>(
    hasOfficialArt ? 'official' : 'sprite'
  );

  /**
   * Having this return an element so I can use icons and not just images
   * @returns The element to use as the pokemon icon
   */
  function ChooseIcon(): JSX.Element {
    // Official Art
    if (getArtType === 'official') {
      const art =
        pokemon.sprites.other?.['official-artwork'].front_default ?? undefined;

      if (art) return <Image src={art} />;
      else return <ImageIcon className='p-5' />;
    }

    // Sprite
    if (getArtType === 'sprite') {
      const art = pokemon.sprites.front_default;

      if (art)
        return <Image src={art} style={{ imageRendering: 'pixelated' }} />;
      else return <ImageIcon className='p-5' />;
    }

    // Shouldn't be possible to get here, but you never know
    throw new PokemonInspectionError(
      pokemon.id,
      "Something went wrong while loading the pokemon's image"
    );
  }

  return (
    <>
      <div>
        {/* Selector for type of art */}
        <ToggleButtonGroup
          name='artType'
          type='radio'
          value={getArtType}
          onChange={(val) => setArtType(val)}
          className='w-100'
        >
          <ToggleButton
            id='pokemon-art-radio-official'
            value={'official'}
            disabled={!hasOfficialArt}
          >
            Official
          </ToggleButton>

          <ToggleButton id='pokemon-art-radio-sprite' value={'sprite'}>
            Sprite
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Render the image */}
        <div className='p-1'>
          <Ratio aspectRatio='1x1'>
            <ChooseIcon />
          </Ratio>
        </div>

        {/* Size and weight because why not? */}
        <Stack direction='horizontal' className=''>
          <p className='mx-auto text-center'>Size: {pokemon.height / 10}m</p>
          <p className='mx-auto text-center'>Weight: {pokemon.weight / 10}kg</p>
        </Stack>
      </div>
    </>
  );
}

export default PokemonIcon;
