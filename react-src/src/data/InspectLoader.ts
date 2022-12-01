import {
  Pokemon,
  Type,
  PokemonClient,
  Version,
  NamedAPIResourceList,
  VersionGroup,
} from 'pokenode-ts';
import { LoaderFunctionArgs } from 'react-router-dom';
import { FixedPokemonSpecies } from './FixedPokemonSpecies';
import { formatApiText } from './pokemon';
import { PokemonInspectionError } from '../pages/errors/PokemonInspectionError';

/**
 * The difinition for this page's data.
 * @pokemon The API Pokemon
 * @species The pokemon's species
 * @type1 The first type of the pokemon
 * @type2 The optional second type
 * @allVersions Every game version
 * @allVersionGroups Every group of games
 */
export type PokemonLoaderData = {
  pokemon: Pokemon;
  species: FixedPokemonSpecies;
  type1: Type;
  type2: Type | undefined;
  allVersions: Version[];
  allVersionGroups: VersionGroup[];
};

/**
 * Loads all of the data for the page so that It's all centralized here
 * @param id The id of the pokemon
 * @returns Data to be used throughout the page
 */
export async function pokeLoader({
  params: { id },
}: LoaderFunctionArgs): Promise<PokemonLoaderData> {
  const api = new PokemonClient();
  const apiUrl = 'https://pokeapi.co/api/v2/';

  if (id === undefined)
    throw new PokemonInspectionError(
      id,
      'Idk how this is even possible, but the id is undefined'
    );

  if (isNaN(parseInt(id)))
    throw new PokemonInspectionError(id, `Id "${id}" is not a number`);

  // Pokemon is the core of the rest of the data, so get it first
  const pokemon = await api.getPokemonById(parseInt(id)).catch(() => {
    throw new PokemonInspectionError(
      id,
      `Could not get pokemon of id "${id}". Please check your connection and that the id is valid.`
    );
  });

  // Annoying doing this, but it makes my life easier
  // Can attemt to grab data of any type from any url
  async function apiGet<T>(url: string): Promise<T> {
    return api.api
      .get<T>(url)
      .then((resp) => resp.data)
      .catch((reason) => {
        console.log(typeof reason);
        throw new PokemonInspectionError(
          id,
          `Something went wrong. Check your connection. 
          If your connection is not an issue, the url ${url} might not contain the right data. 
          Check the developer console for more info.`
        );
      });
  }

  // Set up getting the data from other api pages
  const promises = {
    species: apiGet<FixedPokemonSpecies>(pokemon.species.url),
    type1: apiGet<Type>(pokemon.types[0].type.url),
    type2: pokemon.types[1]
      ? apiGet<Type>(pokemon.types[1].type.url)
      : undefined,
    versions: apiGet<NamedAPIResourceList>(apiUrl + 'version?limit=100').then(
      (list) => list.results.map((r) => apiGet<Version>(r.url))
    ),
    versionGroups: apiGet<NamedAPIResourceList>(
      apiUrl + 'version-group?limit=100'
    ).then((list) => list.results.map((r) => apiGet<VersionGroup>(r.url))),
  };

  // Get all of the promises in paralell
  const [species, type1, type2, versionsPromise, versionGroupsPromise] =
    (await Promise.all(Object.values(promises))) as [
      FixedPokemonSpecies,
      Type,
      Type | undefined,
      Promise<Version>[],
      Promise<VersionGroup>[]
    ];

  // Get the versions and version groups
  const versions = (await Promise.all(versionsPromise)) as Version[];
  const versionGroups = (await Promise.all(
    versionGroupsPromise
  )) as VersionGroup[];

  // Format some text to not look like garbage
  pokemon.name = formatApiText(pokemon.name);

  // Return the data in a nice object
  return {
    pokemon: pokemon,
    species: species,
    type1: type1,
    type2: type2,
    allVersions: versions,
    allVersionGroups: versionGroups,
  };
}
