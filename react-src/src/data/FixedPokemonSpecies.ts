import { FlavorText, PokemonSpecies, Version } from 'pokenode-ts';

/**
 * Pokenode-ts is missing handling for flavor text version >:(
 *
 * All this really changes from PokemonSpecies is
 * the flavor text has the game version added
 *
 * This does require manually using the api to get the page as this interface ex:
 * ```
 * const api = new PokemonClient();
 * const species = await api.api.get<FixedPokemonSpecies>(speciesUrl).then(resp => resp.data);
 * ```
 */
export interface FixedPokemonSpecies extends PokemonSpecies {
  // Extend the standard FlavorText to include
  // If I need to use versioned flavor text in other stuff, I should improve this
  flavor_text_entries: (FlavorText & {
    version: Version;
  })[];
}
