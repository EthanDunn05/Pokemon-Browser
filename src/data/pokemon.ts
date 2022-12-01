import pokemonUnformatted from '../pokemon.json';

export type Pokemon = {
  name: string;
  id: number;
  url: string;
};

export function formatApiText(name: string): string {
  try {
    return name
      .split('-')
      .map((p) => (p = p[0].toUpperCase() + p.slice(1)))
      .join(' ');
  } catch (e) {
    console.warn(e);
    return name;
  }
}

export const pokemon: Pokemon[] = pokemonUnformatted.map((_p) => {
  const p = _p as Pokemon;

  p.name = formatApiText(p.name);

  p.id = Number.parseInt(
    p.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')
  );

  return p;
});
