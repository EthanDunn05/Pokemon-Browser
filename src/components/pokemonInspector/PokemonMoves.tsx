import { NamedAPIResource, PokemonMoveVersion } from 'pokenode-ts';
import { useEffect, useState } from 'react';
import { Button, ListGroup, ListGroupItem, Stack } from 'react-bootstrap';
import { formatApiText } from '../../data/pokemon';
import { PokemonLoaderData } from '../../data/InspectLoader';
import StringSelector from './StringSelector';
import MoveInspector from './MoveInspector';

interface IProps {
  loadData: PokemonLoaderData;
}

type VersionedMove = {
  move: NamedAPIResource;
  versionDetails: PokemonMoveVersion;
};

/**
 * This component is a bit of a mess tbh, but it works so it'll stay
 * Maybe I'll refactor it at some point (Probably not)
 *
 * Displays all of the pokemon's moves in a list with a version group
 *   selector
 */
function PokemonMoves(props: IProps): JSX.Element {
  const { pokemon, allVersionGroups } = props.loadData;

  const [getVersion, setVersion] = useState<string>('');
  const [getVersionGroups, setVersionGroups] = useState<string[]>();

  const [getVersionMoves, setVersionMoves] = useState<VersionedMove[]>();
  const [getShowMoveInfo, setShowMoveInfo] = useState<boolean>(false);
  const [getMoveInfoName, setMoveInfoName] = useState<string>('');

  /**
   * Horrible worst case runtime, but it will usually exit early
   * The pokemon.game_indices is incomplete (Nothing past BW2),
   *   so this will have to do instead
   *
   * Filter only version groups that this pokemon was in
   */
  useEffect(() => {
    const versionGroups = allVersionGroups
      .filter((vg) =>
        pokemon.moves.some((m) =>
          m.version_group_details.some(
            (moveVersion) => moveVersion.version_group.name === vg.name
          )
        )
      )
      .map((vg) => formatApiText(vg.name));

    setVersionGroups(versionGroups);
    setVersion(versionGroups[0]);
  }, [allVersionGroups, pokemon.moves]);

  /**
   * This monstrosity works
   * Tbh I might want to move this to it's own function to
   *   hopefully be cleaner...
   *   But then I wouldn't be able to set states soo...
   *
   * Gets the version specific data for each move
   */
  useEffect(() => {
    // Get the moves that the pokemon has in this version group
    const versionMovesUnfiltered = pokemon.moves.map((move) => {
      const versionedMoveData = move.version_group_details.find(
        (vg) => formatApiText(vg.version_group.name) === getVersion
      );

      // Return the move with the version-specific data unless
      // The move isn't in this version group
      if (!versionedMoveData) return;
      return {
        move: move.move,
        versionDetails: versionedMoveData,
      } as VersionedMove;
    });

    // Filter out undefined moves
    let versionMoves = versionMovesUnfiltered.filter<VersionedMove>(
      (m): m is VersionedMove => !!m
    );

    // Filter for only level-up moves
    versionMoves = versionMoves.filter(
      (m) => m.versionDetails.move_learn_method.name === 'level-up'
    );

    // Sort ascending by level
    versionMoves.sort(
      (m1, m2) =>
        m1.versionDetails.level_learned_at - m2.versionDetails.level_learned_at
    );

    setVersionMoves(versionMoves);
  }, [pokemon, allVersionGroups, getVersion]);

  // Don't try and get moves if the data doesn't exist
  if (!getVersionMoves || !getVersionGroups)
    return <h1 className='m-auto'>Loading</h1>;

  // Don't try to display moves if there aren't any
  if (getVersionMoves.length < 1)
    return <h1 className='m-auto'>This pokemon doesn&appo;t have any moves</h1>;

  return (
    <div>
      <Stack direction='horizontal'>
        <h1 className='text-center m-auto'>Learnset</h1>
        <StringSelector
          values={getVersionGroups}
          value={getVersion}
          defaultValue={getVersion}
          onChange={(v) => setVersion(v)}
        />
      </Stack>
      <hr />
      <ListGroup>
        {getVersionMoves.map((move) => (
          <ListGroupItem>
            <Stack direction='horizontal'>
              <h4 className='my-auto'>
                Level {move.versionDetails.level_learned_at}:{' '}
                {formatApiText(move.move.name)}
              </h4>
              <Button
                className='ms-auto border-white'
                onClick={() => {
                  // Set info before showing to update the data first
                  setMoveInfoName(move.move.name);
                  setShowMoveInfo(true);
                }}
              >
                Open for more info
              </Button>
              <MoveInspector
                show={getShowMoveInfo}
                moveName={getMoveInfoName}
                versionGroup={getVersion}
                onClose={() => setShowMoveInfo(false)}
              />
            </Stack>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

export default PokemonMoves;
