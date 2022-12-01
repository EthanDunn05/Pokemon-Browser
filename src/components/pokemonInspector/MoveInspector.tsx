import { Move, MoveClient } from 'pokenode-ts';
import { useEffect, useMemo, useState } from 'react';
import { Modal, Spinner, Stack } from 'react-bootstrap';
import { formatApiText } from '../../data/pokemon';

type IProps = {
  moveName: string;
  versionGroup: string;
  show: boolean;
  onClose: () => void;
};

/**
 * Displays move info for the version.
 * Pretty simple as of now, but this might need to be split into multiple components
 *   like the Pokemon Inspector is if it gets too complex
 */
function MoveInspector(props: IProps): JSX.Element {
  const { moveName, versionGroup, show, onClose } = props;

  const [getMoveData, setMoveData] = useState<Move | undefined>(undefined);

  // Finds the move's flavor text in english and for the current version
  const flavorText = useMemo(() => {
    if (!getMoveData) return undefined;
    return getMoveData.flavor_text_entries.find((text) => {
      return (
        text.language.name === 'en' &&
        formatApiText(text.version_group.name) === versionGroup
      );
    })?.flavor_text;
  }, [getMoveData, versionGroup]);

  function handleClose(): void {
    onClose();
  }

  /**
   * Fetch the move data whenever the move we need to display changes
   */
  useEffect(() => {
    if (!moveName) return;

    const api = new MoveClient();
    const move = api.getMoveByName(moveName);

    // Set the data when done retrieving
    move
      .then((md) => {
        setMoveData(md);
      })
      .catch((e) => {
        console.error(e);
        handleClose();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveName]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      animation={false}
      size='lg'
    >
      {/* Verify move name so it only displays the correct move info */}
      {getMoveData && getMoveData.name === moveName ? (
        <>
          <Modal.Header>
            <Modal.Title>{formatApiText(getMoveData.name)}</Modal.Title>
            <h5
              className='ms-auto my-auto'
              data-move-class={getMoveData.damage_class?.name}
            >
              {formatApiText(getMoveData.damage_class?.name ?? '---')}
            </h5>
            <h5
              className='mx-2 my-auto'
              data-inspector-type={getMoveData.type.name}
            >
              {formatApiText(getMoveData.type.name)}
            </h5>
          </Modal.Header>

          <Modal.Body>
            <Stack direction='horizontal' className='inspector-panel px-3 mb-2'>
              <h5 className='my-auto me-auto'>
                Power: {getMoveData.power ?? '---'}
              </h5>
              <h5 className='m-auto'>PP: {getMoveData.pp ?? '---'}</h5>
              <h5 className='my-auto ms-auto'>
                Acc: {getMoveData.accuracy ?? '---'}
              </h5>
            </Stack>

            {flavorText && (
              <h4 className='inspector-panel my-2'>{flavorText}</h4>
            )}
          </Modal.Body>
        </>
      ) : (
        <Spinner animation='border' className='m-auto' />
      )}
    </Modal>
  );
}

export default MoveInspector;
