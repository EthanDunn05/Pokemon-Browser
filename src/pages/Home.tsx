import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { pokemon } from '../data/pokemon';
import { routes } from '../routes';

function Home(): JSX.Element {
  const navigate = useNavigate();

  function randomPokemon(): void {
    let rand = Math.random() * pokemon.length;
    rand = Math.floor(rand);
    const id = pokemon[rand].url.split('/').at(-2);

    navigate(`${routes.pokemon}/${id}`);
  }

  return (
    <>
      <h1 className='text-center'>Welcome!</h1>
      <h4>Search for a specific pokemon or try something below!</h4>
      <hr />

      <NavThing
        label='Go to a random Pokemon -'
        buttonText='Random Pokemon'
        onClick={randomPokemon}
      />
    </>
  );
}

/**
 * Just a small component to use in the list of
 * stuff to do in the main page
 * @param label The label that is used to the left of the button
 * @param buttonText The text that is in the Button
 * @param onClick The function to be called when the Button is clicked
 */
function NavThing(props: {
  label: string;
  buttonText: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return (
    <Row className='m-2'>
      <Col xs={7}>
        <h2 className='my-auto'>{props.label}</h2>
      </Col>
      <Col>
        <Button className='mx-auto w-100' onClick={props.onClick}>
          {props.buttonText}
        </Button>
      </Col>
    </Row>
  );
}

export default Home;
