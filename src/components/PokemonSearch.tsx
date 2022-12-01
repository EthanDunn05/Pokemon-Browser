import { SearchIcon } from '@primer/octicons-react';
import Fuse from 'fuse.js';
import React, { useEffect, useMemo, useState } from 'react';
import { Dropdown, FormControl, Stack } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes';
import { Pokemon, pokemon } from '../data/pokemon';

const NUM_SUGGESTIONS = 5;

/**
 * This component is terribly laid out
 */
function PokemonSearch(): JSX.Element {
  const navigate = useNavigate();

  const [getValue, setValue] = useState<string>('');
  const [getSuggestions, setSuggestions] = useState<Pokemon[]>(
    pokemon.slice(0, NUM_SUGGESTIONS)
  );
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const FUSE = useMemo(
    () => new Fuse<Pokemon>(pokemon, { keys: ['name'] }),
    []
  );

  /**
   * Sets the suggestions whenever the searchbox value is updated
   */
  useEffect(() => {
    if (getValue === '') {
      setSuggestions(pokemon.slice(0, NUM_SUGGESTIONS));
    } else {
      const fuzzyResult = FUSE.search(getValue);
      setSuggestions(fuzzyResult.slice(0, NUM_SUGGESTIONS).map((r) => r.item));
    }
  }, [getValue, FUSE]);

  /**
   * Handles when a pokemon is selected from the dropdown
   * @param k The id of the pokemon selected
   */
  function handleSelect(k: unknown): void {
    if (k === null) return;

    const suggestedPokemon = getSuggestions.find((s) => s.id.toString() === k);
    if (suggestedPokemon === undefined) return;

    setValue(suggestedPokemon.name);
    setShowSuggestions(false);

    navigate(routes.pokemon + '/' + suggestedPokemon.id);
  }

  /**
   * Handles the search form changing
   * @param e The form onChange event
   */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const searchText = e.target.value ?? '';
    setValue(searchText);
  }

  // Render
  return (
    <Stack direction='horizontal' gap={2}>
      <SearchIcon size={20} className='p-0' />

      <Dropdown
        show={showSuggestions}
        align='end'
        onSelect={handleSelect}
        autoClose='outside'
        onToggle={(show, metadata) => {
          if (metadata.source !== 'select') setShowSuggestions(show);
        }}
      >
        <FormControl
          placeholder='Search for a Pokemon'
          onChange={handleChange}
          onClick={() => setShowSuggestions(true)}
          value={getValue}
        />
        {/* Shows the suggested pokemon based on the current search */}
        <DropdownMenu>
          {getSuggestions.map((p) => (
            <DropdownItem eventKey={p.id}>{p.name}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </Stack>
  );
}

export default PokemonSearch;
