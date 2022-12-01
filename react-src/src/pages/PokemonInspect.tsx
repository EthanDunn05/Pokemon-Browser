import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import PokemonIcon from '../components/pokemonInspector/PokemonIcon';
import PokemonDescriptions from '../components/pokemonInspector/PokemonDescriptions';
import PokemonStats from '../components/pokemonInspector/PokemonStats';
import { PokemonLoaderData } from '../data/InspectLoader';
import PokemonMoves from '../components/pokemonInspector/PokemonMoves';
import PokemonHeader from '../components/pokemonInspector/PokemonHeader';
import { useState } from 'react';
import { formatApiText } from '../data/pokemon';

/**
 * The Root element for the pokemon inspection page.
 */
function PokemonInspect(): JSX.Element {
  const loadData = useLoaderData() as PokemonLoaderData;

  const bottomPanels: { [key: string]: JSX.Element } = {
    stats: <PokemonStats loadData={loadData} />,
    learnset: <PokemonMoves loadData={loadData} />,
  };

  const [getBottomPanel, setBottomPanel] = useState('');

  if (!bottomPanels[getBottomPanel])
    setBottomPanel(Object.keys(bottomPanels)[0]);

  return (
    <>
      <PokemonHeader loadData={loadData} />

      <Row className='my-1'>
        <Col xs={4}>
          <div className='inspector-panel'>
            <PokemonIcon loadData={loadData} />
          </div>
        </Col>
        <Col>
          <div className='inspector-panel h-100'>
            <PokemonDescriptions loadData={loadData} />
          </div>
        </Col>
      </Row>

      <Row className='my-2'>
        <Col>
          <div className='inspector-panel'>
            <ButtonGroup className='w-100 mb-2'>
              {Object.keys(bottomPanels).map((p) => (
                <Button
                  active={getBottomPanel === p}
                  onClick={() => setBottomPanel(p)}
                >
                  {formatApiText(p)}
                </Button>
              ))}
            </ButtonGroup>
            {bottomPanels[getBottomPanel]}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default PokemonInspect;
